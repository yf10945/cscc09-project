import React from 'react';
import "./PlaylistList.css";
import PlaylistShortcut from "./PlaylistShortcut";

function PlaylistList({ playlists, setPlaylists }) {
    return (
        <div className="playlist-list">
            {playlists.length <= 0 ? (
                <p className="no-songs">You currently have no playlists.</p>
            ) : (
                playlists.map((playlist) => (
                    <PlaylistShortcut 
                        key={playlist._id} 
                        playlist={playlist}
                        setPlaylists={setPlaylists}
                        />
                ))
            )}
        </div>
    )
}

export default PlaylistList

