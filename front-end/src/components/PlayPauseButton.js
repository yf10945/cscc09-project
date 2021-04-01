import React, { useState, useContext } from 'react';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

function PlayPauseButton({ playing, song, isCurrentSong, visible }) {
    // const { dispatch } = useContext(StoreContext);
    const style = { visibility: visible ? "visible" : "hidden" };

    if (isCurrentSong && playing) {
        return (
            <div className="play-pause-button">
                <PauseCircleOutlineIcon className="pause-icon" style={style} fontSize="large" />
            </div>
        )
    } else {
        return (
            <div className="play-pause-button">
                <PlayCircleOutlineIcon className="play-icon" style={style} fontSize="large" />
            </div>
        )
    }
}

export default PlayPauseButton
