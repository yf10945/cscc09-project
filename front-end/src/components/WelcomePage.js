import React from 'react';
import "./WelcomePage.css";
import "../styles.css";
import { Link } from 'react-router-dom';
import logo from "../Logo";

function WelcomePage() {

    return (
        <div className="welcome-page main-theme">
            <img
                src={logo}
                alt="logo"
                className="logo"
            />
            <div className="welcome-page-text">
                <h1>catJAM</h1>
                <h3>Listen to music and karaoke with your friends!</h3>
            </div>
            <div className="welcome-buttons">
                <Link to="/login" className="undecorated-link">
                    <div className="login-button main-button-theme">
                        Log In
                    </div>
                </Link>
                <Link to="/signup" className="undecorated-link">
                    <div className="signup-button main-button-theme">
                        Sign Up
                    </div>
                </Link>
            </div>
            <Link to="/aboutus" className="about-us-link undecorated-link decorated-when-hovered-link">
                <p className="main-theme">About Us</p>
            </Link>
        </div>
    )
}

export default WelcomePage
