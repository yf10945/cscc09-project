import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./MusicPlayer.css";
import "../styles.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
// import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../dataLayer";
import { ToggleOnOutlined } from '@material-ui/icons';
import { useLocation } from "react-router-dom";

function MusicPlayer() {
    const [{ 
        playingSong, 
        playingSongTitle,
        playingSongArtists,
        songs,
        nextSong,
        previousSong,
        repeat, 
        random,
        playing,
        handleEnd,
        volume,
        timestamp
    }, dispatch] = useDataLayerValue();
    const audio = useRef("audio-tag");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const toggleAudio = useCallback(() => {
        (audio.current.paused && playing) ? audio.current.play() : audio.current.pause();
    }, [playing]);

    const changeVolume = (e, newVolume) => {
        console.log(audio.current.paused);
        dispatch({
            type: 'SET_VOLUME',
            volume: newVolume
        });
        audio.current.volume = volume;
    };

    const handleProgress = (e) => {
        var compute = (e.target.value * duration) / 100;
        setCurrentTime(compute);
        audio.current.currentTime = compute;
    };

    const songTime = (t) => { return (t - (t %= 60)) / 60 + (10 < t ? ':' : ':0') + ~~(t); };

    const togglePlaying = () => dispatch({
        type: "TOGGLE_PLAY",
        playing: !playing
    });

    const setCurrentSong = (url, title, artists) => dispatch({
        type: "SET_SONG",
        playingSong: url,
        playingSongTitle: title,
        playingSongArtists: artists
    });

    const toggleRepeat = () => dispatch({
        type: "TOGGLE_REPEAT",
        repeat: !repeat
    });

    const toggleRandom = () => dispatch({
        type: "TOGGLE_RANDOM",
        random: !random
    });

    const setTimestamp = useCallback((time) => dispatch({
        type: "SET_TIMESTAMP",
        timestamp: time
    }), [dispatch]);

    useEffect(() => {
        if (playing) {
            toggleAudio();
        }
    }, [playing, playingSong, toggleAudio]);

    const location = useLocation();

    if (location.pathname === "/" ||
        location.pathname === "/aboutus" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/404" ||
        location.pathname === "/addsong") {
      return null;
    }

    return (
        <div className="music-player">
            <audio 
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onCanPlay={(e) => setDuration(e.target.duration)}
                onEnded={() => {togglePlaying();}} // add handleEnd later
                ref={audio}
                preload="true"
                src={playingSong}
                loop={repeat}
            />
            <div className="music-player-left">
                <img src="" alt="" className="footer-album-logo"/>
                <div className="music-player-songInfo">
                    <h4>{playingSongTitle}</h4>
                    <p>{playingSongArtists}</p>
                </div>
            </div>
            <div className="music-player-center">
                <div className="center-top">
                    <div className="shuffle-button" onClick={toggleRandom}>
                        <ShuffleIcon className={"music-player-" + (random ? "green" : "white")}  />
                    </div>
                    <div className="previous-button" onClick={previousSong}>
                        <SkipPreviousIcon className="music-player-icon" />
                    </div>
                    <div className="play-button" 
                        onClick={() => {
                            if (playingSong != null) {
                                togglePlaying();
                                toggleAudio();
                            }
                        }}>
                        <PlayCircleOutlineIcon className={"music-player-icon-" + ((playing && playingSong != null) ? "hide" : "")} fontSize="large" />
                        <PauseCircleOutlineIcon className={"music-player-icon-" + ((playing && playingSong != null) ? "" : "hide")} fontSize="large" />
                    </div>
                    <div className="next-button" onClick={nextSong}>
                        <SkipNextIcon className="music-player-icon" />
                    </div>
                    <div className="repeat-button" onClick={toggleRepeat}>
                        <RepeatIcon className={"music-player-" + (repeat ? "green" : "white")} />
                    </div>
                </div>
                <div className="center-bottom">
                    <div className="song-progress-bar">
                        <div className="current-song-time">{songTime(currentTime)}</div>
                        <input
                            onChange={handleProgress}
                            value={duration ? (currentTime * 100) / duration : 0}
                            type="range" 
                            name="progress-bar" 
                            className="progress-bar" />
                        <div className="total-song-time">{songTime(duration)}</div>                       
                    </div>
                </div>
            </div>
            <div className="music-player-right">
                <Grid container spacing={2}>
                    {/* <Grid item>
                        <PlaylistPlayIcon />
                    </Grid> */}
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider value={volume} min={0} max={1} step={0.01} onChange={changeVolume} />
                    </Grid>
                </Grid>
            </div>           
        </div>
    )
}

export default MusicPlayer
