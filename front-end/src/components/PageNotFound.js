import React from 'react';
import "./PageNotFound.css";
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="page-not-found main-theme">
            <div className="pnf-error-message">
                <img src="https://i.ytimg.com/vi/jXdbw21SKQg/mqdefault.jpg" alt="Sad Cat" />
                <h2>404: Page does not exist :(</h2>
            </div>
            <Link to="/" className="back-to-welcome undecorated-link decorated-when-hovered-link">
                <p className="main-theme-no-background">Back to Home</p>
            </Link>   
        </div>
    )
}

export default PageNotFound
