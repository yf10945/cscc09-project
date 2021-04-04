import React, { useState, useContext, useEffect } from 'react';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import "./PlayPauseButton.css";
import { useDataLayerValue } from "../dataLayer";

function PlayPauseButton({ playing, songId, song, visible, songTitle, songArtists }) {
    const [{ playingSong, playingSongTitle, playingSongArtists, songlist }, dispatch ] = useDataLayerValue();
    const style = { visibility: visible ? "visible" : "hidden" };

    const index = songlist.findIndex(i => i._id === songId);

    const playSong = (url, title, artists) => dispatch({
        type: "SET_SONG",
        playingSong: index,
        playingSongTitle: title,
        playingSongArtists: artists
    });

    if (playing) {
        return (
            <div className="play-pause-button">
                <PauseCircleOutlineIcon className="pause-icon" style={style} fontSize="large" onClick={() => playSong(song, songTitle, songArtists)} />
            </div>
        )
    } else {
        return (
            <div className="play-pause-button">
                <PlayCircleOutlineIcon className="play-icon" style={style} fontSize="large" onClick={() => playSong(song, songTitle, songArtists)} />
            </div>
        )
    }
}

export default PlayPauseButton
