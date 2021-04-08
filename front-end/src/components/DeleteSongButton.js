import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDataLayerValue } from "../dataLayer";
import "../styles.css";

function DeleteSongButton({ song, setSongs, deleteSong, getSongs, playlistId }) {
    const [, dispatch] = useDataLayerValue();
    // console.log("playtlist" + playlistId);

    return (
        <div className="delete-song-button">
            <DeleteIcon
                className="pointer delete-icon"
                onClick={() => playlistId != null ? deleteSong(song, setSongs, getSongs, playlistId) : deleteSong(song, setSongs, getSongs)} />
        </div>
    )
}

export default DeleteSongButton