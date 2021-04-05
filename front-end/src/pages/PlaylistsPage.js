import React, { useState, useEffect } from "react";
import "../styles.css";
import "./PlaylistsPage.css";
import { useDataLayerValue } from "../dataLayer";
import PlaylistList from "../components/PlaylistList";


function PlaylistsPage() {
    const [, dispatch] = useDataLayerValue();
    const [playlists, setPlaylists] = useState([]);

    

    return (
        <div className="playlists-page main-theme">
            <div className="main">
                <h1>Your Playlists</h1>
                {/* Add spacing between songs list and music control bar with footer*/}
                <PlaylistList />
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default PlaylistsPage
