import React from 'react';
import "./AddSongButton.css";
import "../styles.css";
import { useDataLayerValue } from "../dataLayer";
import AddIcon from '@material-ui/icons/Add';

function AddSongButton({ songId, playlistId, addSong, visible, getSongs, playlistSongs, setPlaylistSongs, getAddSongs, addSongs, setAddSongs }) {
    const [{ playingPlaylist, viewingPlaylist, songlist, playingSong, playingSongTitle, playingSongArtists }, dispatch] = useDataLayerValue();
    const style = { visibility: visible ? "visible" : "hidden" };
    // console.log(songId);
    // console.log(playlistId);
    return (
        <div className="add-song-button">
            <AddIcon
                className="pointer add-song-button"
                style={style}
                fontSize="large"
                onClick={() => addSong(songId, playlistId)}
            />
        </div>
    )
}

export default AddSongButton