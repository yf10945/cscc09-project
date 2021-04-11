import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDataLayerValue } from "../dataLayer";
import "../styles.css";

function DeleteSongButton({ song, setSongs, deleteSong, getSongs, playlistId, visible }) {
    const [, dispatch] = useDataLayerValue();
    const style = { visibility: visible ? "visible" : "hidden" };
    // console.log("playtlist" + playlistId);

    return (
        <div className="delete-song-button">
            <DeleteIcon
                className="pointer delete-icon"
                onClick={() => playlistId != null ? deleteSong(song, setSongs, getSongs, playlistId) : deleteSong(song, setSongs, getSongs)}
                style={style}
                />
        </div>
    )
}

export default DeleteSongButton