import React from 'react';
import "./PlaylistShortcut.css";

function PlaylistShortcut({ playlist, setPlaylists }) {
    return (
        <div className="playlist-shortcut">
            <h3>{playlist.title}</h3>
        </div>
    )
}

export default PlaylistShortcut
