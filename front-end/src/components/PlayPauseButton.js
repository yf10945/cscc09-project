import React, { useState, useContext, useEffect } from 'react';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import "./PlayPauseButton.css";

function PlayPauseButton({ playing, songId, song, isCurrentSong, visible }) {
    // const { dispatch } = useContext(StoreContext);
    const style = { visibility: visible ? "visible" : "hidden" };

    const playSong = (url) => {
        // var audioElement = new Audio(url);
        // audioElement.play();
    };

    if (isCurrentSong && playing) {
        return (
            <div className="play-pause-button">
                <PauseCircleOutlineIcon className="pause-icon" style={style} fontSize="large" onClick={() => playSong(song)} />
            </div>
        )
    } else {
        return (
            <div className="play-pause-button">
                <PlayCircleOutlineIcon className="play-icon" style={style} fontSize="large" onClick={() => playSong(song)} />
            </div>
        )
    }
}

export default PlayPauseButton
