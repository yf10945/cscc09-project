import React from 'react';
import "./NavBar.css";
import "../styles.css";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="NavContainer main-theme">
            <ul>
                <li><Link to="/playlists"> My Playlists </Link></li>
                <li><Link to="/addsong"> Add Song </Link></li>
            </ul>
        </div>
    )
}