import React from 'react';
import "./WelcomePage.css";
import { Link } from 'react-router-dom';

function WelcomePage() {

    return (
        <div className="welcome-page">
            <h1>Welcome</h1>
            <Link to='/aboutus'>
                <p>About Us</p>
            </Link>
        </div>
    )
}

export default WelcomePage
