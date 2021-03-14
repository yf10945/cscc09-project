import React from 'react';
import "../styles.css";
import "./AboutUsPage.css";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";

export default function AboutUsPage() {
  return (
    <div>
      <NavBar/>
      <div className="about-us-page main-theme main">
        
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_496903.png"
            alt="logo"
            className="icon"
          />
          <h1>About Us</h1>
          <p>
            This app is developed for CSCC09 project. It is a music player app that
            allows for karaoke.
          </p>
          <p>Developed by: Yishen Feng, Glenn Qing Yuan Ye, and Kia Naderi</p>
          <Link to="/" className="back-to-welcome undecorated-link decorated-when-hovered-link">
            <p className="main-theme-no-background back-to-welcome">Back to Home</p>
          </Link>  
      </div>
    </div>
  );
}
