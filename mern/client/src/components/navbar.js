import React from "react";
import logo from './images/logoPlaceholder.png';
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

const urlParams = new URLSearchParams(window.location.search);
async function getClientId() {
  const redirectUri = 'http://localhost:5000/auth/google/callback'
  const scope = 'profile email openid'
  const responseType = 'code'

  const response = await fetch('clientId')
  const json = await response.json()
  document.querySelector('#link').href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${json.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline&include_granted_scopes=true`
}

function loginDisplay() {
  if (urlParams.get('id')) {
    return `Hi, ${urlParams.get('given_name')}!`;
  }
  else return "Login";
}

// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 50 + '%'}} src={logo}></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Table View
             </NavLink>
           </li>
         </ul>
       </div>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Map View
             </NavLink>
           </li>
         </ul>
       </div>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Contribute Resource
             </NavLink>
           </li>
         </ul>
       </div>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/login">
               {loginDisplay()}
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}