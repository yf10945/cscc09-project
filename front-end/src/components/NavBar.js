import React, { useState, useEffect } from 'react';
import "./NavBar.css";
import "../styles.css";
import { Link } from 'react-router-dom';
import logo from "../Logo";
import { Add, Chat, Dashboard, ExitToApp, LibraryMusic, MusicNote } from '@material-ui/icons';
import NavBarOption from "./NavBarOption";
import { Menu } from '@material-ui/core';
import { bool, func } from 'prop-types';
import { StyledNav } from "./NavBar.styled";

export default function NavBar({ open, setOpen }) {
    const [username, setName] = useState("");
    useEffect(() => {
        let username = document.cookie.match(new RegExp('(^| )' + 'username' + '=([^;]+)'))[2];
        setName(username);
    }, [username]);
    
    return (
        <StyledNav open={open}>
            <img
            src={logo}
            alt="logo"
            className="navbar-icon"
            />
            <h2>catJAM</h2>
            <Link to="/dashboard" className="navbar-link">
                <NavBarOption Icon={Dashboard} title="Dashboard" />
            </Link>
            <Link to="/rooms" className="navbar-link">
                <NavBarOption Icon={Chat} title="Karaoke Rooms" />
            </Link>
            <Link to="/songs" className="navbar-link">
                <NavBarOption Icon={MusicNote} title="Your Songs" />
            </Link>
            <Link to="/playlists" className="navbar-link">
                <NavBarOption Icon={LibraryMusic} title="Your Playlists" />
            </Link>
            <Link to="/addsong" className="navbar-link">
                <NavBarOption Icon={Add} title="Add Song" />
            </Link>
            <Link to="/profile" className="profile">
                <NavBarOption title={username}/>
            </Link>
            <Link to="/" className="sign-out">
                <NavBarOption Icon={ExitToApp} title="Sign Out" />
            </Link>
        </StyledNav>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired
};