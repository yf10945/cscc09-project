import React from 'react';
import "./PlaylistShortcut.css";
import { Link } from 'react-router-dom';

function PlaylistShortcut({ playlist, setPlaylists }) {
    return (
        <Link to={`/playlists/${playlist._id}`} className="main-theme playlist-link">
            <div className="playlist-shortcut">
                <h3>{playlist.title}</h3>
            </div>
        </Link>
    )
}

export default PlaylistShortcut
