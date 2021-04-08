import React, { useState, useContext, useEffect } from 'react';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import "./PlayPauseButton.css";
import "../styles.css";
import { useDataLayerValue } from "../dataLayer";

function PlayPauseButton({ playing, songId, song, visible, songTitle, songArtists, songs }) {
    const [{ playingSong, playingSongTitle, playingSongArtists, songlist }, dispatch ] = useDataLayerValue();
    const style = { visibility: visible ? "visible" : "hidden" };

    const playSong = (title, artists) => {
        dispatch({
            type: "SET_SONG",
            playingSong: songlist.findIndex(i => i._id === songId),
            playingSongTitle: title,
            playingSongArtists: artists
        });
    };
    // console.log("PLAY BUTTON: " + JSON.stringify(songs));
    if (playing) {
        return (
            <div className="play-pause-button">
                <PauseCircleOutlineIcon className="pointer pause-icon" style={style} fontSize="large" onClick={() => playSong(songTitle, songArtists)} />
            </div>
        )
    } else {
        return (
            <div className="play-pause-button">
                <PlayCircleOutlineIcon className="pointer play-icon" style={style} fontSize="large" onClick={() => playSong(songTitle, songArtists)} />
            </div>
        )
    }
}

export default PlayPauseButton
