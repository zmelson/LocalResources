import React from "react";
//use for nicer css formatting
import "bootstrap/dist/css/bootstrap.css";
import loginButton from './images/loginButton.PNG';

export default function Login() {
 return (
   <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '40vh', padding:'20px', marginRight:'80px',}}>
     <form action="http://localhost:5000/auth/google">
        <button type="submit" className="google-button">
          <span className="google-button__icon">
            <img src={loginButton}></img>
          </span>
          <br/>
          <span className="google-button__text">Sign in with Google</span>
        </button>
      </form>
      <span style={{display:'inline-block', marginRight: '100px'}}></span>
     <form action="http://localhost:5000/logout">
        <button type="submit" className="google-button">
          <span className="google-button__icon">
            <img src={loginButton}></img>
          </span>
          <br/>
          <span className="google-button__text">Logout of Google</span>
        </button>
      </form>
    </div>
 );
}