import React, { useState, useContext, useEffect } from 'react';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import "./PlayPauseButton.css";
import { useDataLayerValue } from "../dataLayer";

function PlayPauseButton({ playing, songId, song, isCurrentSong, visible, songTitle, songArtists }) {
    const [{ playingSong, playingSongTitle, playingSongArtists }, dispatch ] = useDataLayerValue();
    const style = { visibility: visible ? "visible" : "hidden" };

    const playSong = (url, title, artists) => dispatch({
        type: "SET_SONG",
        playingSong: url,
        playingSongTitle: title,
        playingSongArtists: artists
    });

    if (isCurrentSong && playing) {
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
