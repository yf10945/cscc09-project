import React from 'react';
import "../styles.css";
import "./AboutUsPage.css";
import { Link } from 'react-router-dom';
import logo from "../Logo";

export default function AboutUsPage() {
  return (
    <div className="about-us-page main-theme">
      <img
        src={logo}
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
  );
}
