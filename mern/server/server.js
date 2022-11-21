const mongoose = require('mongoose');
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
//Get driver connection
const dbo = require("./db/conn");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const { config } = require('dotenv');

let clientID = process.env.CLIENT_ID;

app.listen(port, () => {
    //Perform DB connection when server starts
    dbo.connectToServer(function (err) {
        if (err)
            console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));app.use(passport.initialize());
app.use(passport.session());

try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );

} catch (e) {
  console.log("Could not connect Mongoose at " + process.env.ATLAS_URI);
}

const userSchema = new mongoose.Schema ({
    username: String,
    name: String,
    googleId: String,
    secret: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
    }
));

app.use(express.static('public'));
app.get('/clientId', (req, res) => {
  res.send(JSON.stringify({ clientID }))
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get('/auth/google/callback', handleOAuth2)
async function handleOAuth2(req, res) {
  const tokenResponse = await fetch(
    `https://www.googleapis.com/oauth2/v3/token`,
    {
      method: 'POST',
      body: JSON.stringify({
        code: req.query.code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:5000/auth/google/callback',
        grant_type: 'authorization_code'
      })
    }
  )
  const tokenJson = await tokenResponse.json();
  const userInfo = await getUserInfo(tokenJson.access_token);

  res.redirect(`http://localhost:3000?${Object.keys(userInfo).map(key => `${key}=${encodeURIComponent(userInfo[key])}`).join('&')}`);
}

app.get("/logout", function(req, res){
  res.redirect("http://localhost:3000/");
});

async function getUserInfo(accessToken) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  const json = await response.json();
  return json;
};