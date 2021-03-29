import React, { useState, useRef } from "react";
import "../styles.css";
import "./DashboardPage.css";
import { withRouter } from "react-router";
import NavBar from "../components/NavBar";
import MusicPlayer from "../components/MusicPlayer";
import Burger from "../components/Burger";
import { useOnClickOutside } from "../components/useOnClickOutside";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <div className="dashboard main-theme">
            <div className="main">
                <h1>Welcome</h1>
            </div>
            {/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}
            <div ref={node}>
                <Burger open={open} setOpen={setOpen} />
                <NavBar open={open} setOpen={setOpen} />
            </div>
            <MusicPlayer />
        </div>
      );
}