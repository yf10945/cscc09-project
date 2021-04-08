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
import DescriptionIcon from '@material-ui/icons/Description';
import DescriptionIconOutlined from '@material-ui/icons/DescriptionOutlined';
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../dataLayer";
import { useLocation } from "react-router-dom";
import { Lrc } from '@mebtte/react-lrc';
import Draggable, { DraggableCore } from 'react-draggable';

function MusicPlayer() {
    const [{ 
        playingSong, 
        playingSongTitle,
        playingSongArtists,
        songlist,
        repeat, 
        random,
        playing,
        volume
    }, dispatch] = useDataLayerValue();
    const audio = useRef("audio-tag");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyricsBox, toggleLyrics] = useState(false);

    const toggleAudio = useCallback(() => {
        (audio.current.paused && playing && playingSong != null) ? audio.current.play() : audio.current.pause();
    }, [playing, playingSong]);

    const lineRenderer = useCallback(({ lrcLine, index, active }) => {
        const { content } = lrcLine;
        return (
          <div
            style={{
              textAlign: 'center',
              padding: '10px 0',
              color: active ? 'green' : 'inherit',
              transform: `scale(${active ? 1.2 : 1})`,
              transition: 'transform 300ms',
            }}
          >
            {content}
          </div>
        );
    }, []);

    const changeVolume = (e, newVolume) => {
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

    const setCurrentSong = (index) => dispatch({
        type: "SET_SONG",
        playingSong: index,
        playingSongTitle: songlist[index].songName,
        playingSongArtists: songlist[index].artist
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

    const previousSong = () => {
        if (random) {
            setCurrentSong(Math.floor(Math.random() * songlist.length));
        } else if (playingSong === 0) {
            setCurrentSong(songlist.length - 1);
        } else {
            setCurrentSong(playingSong - 1);
        }
    };

    const nextSong = () => {
        if (random) {
            setCurrentSong(Math.floor(Math.random() * songlist.length));
        }else if (playingSong === songlist.length - 1) {
            setCurrentSong(0);
        } else {
            setCurrentSong(playingSong + 1);
        }
    };

    const songEnds = () => {
        if (random) {
            setCurrentSong(Math.floor(Math.random() * songlist.length));
        } else if (playingSong === songlist.length - 1 || repeat) {
            togglePlaying();
            setCurrentSong(0);
        } else {
            nextSong();
        }
    };

    useEffect(() => {
        if (playing && songlist != null) {
            toggleAudio();
        }
    }, [playing, playingSong]);

    const location = useLocation();
    var hideBar = false;

    if (location.pathname === "/" ||
        location.pathname === "/aboutus" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/404" ||
        location.pathname === "/addsong" ||
        location.pathname.match(/.+?(?=rooms\/room)/) !== null) {
        hideBar = true;
    }

    useEffect(() => {
        if (location.pathname === "/" ||
            location.pathname === "/aboutus" ||
            location.pathname === "/login" ||
            location.pathname === "/signup" ||
            location.pathname === "/404" ||
            location.pathname === "/addsong" || 
            location.pathname.match(/.+?(?=rooms\/room)/) !== null) {
            if (!audio.current.paused) togglePlaying();
            audio.current.pause();
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname === "/songs") {
            audio.current.pause();
            audio.current.currentTime = 0;
            dispatch({
                type: "SET_SONG",
                playingSong: null,
                playingSongTitle: null,
                playingSongArtists: null
            });
        }
    }, [songlist]);

    return (
        <div className={"music-player" + (hideBar ? "-hide" : "")}>
            <audio 
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onCanPlay={(e) => setDuration(e.target.duration)}
                onEnded={songEnds} 
                ref={audio}
                preload="true"
                src={songlist !== undefined && songlist.length > 0 && playingSong !== null ? songlist[playingSong].filepath : null}
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
                        <ShuffleIcon className={"pointer music-player-" + (random ? "green" : "white")}  />
                    </div>
                    <div className="previous-button" onClick={previousSong}>
                        <SkipPreviousIcon className="pointer music-player-icon" onClick={previousSong} />
                    </div>
                    <div className="play-button" 
                        onClick={() => {
                            if (playingSong != null) {
                                togglePlaying();
                                toggleAudio();
                            }
                        }}>
                        <PlayCircleOutlineIcon className={"pointer music-player-icon-" + ((playing && playingSong != null) ? "hide" : "")} fontSize="large" />
                        <PauseCircleOutlineIcon className={"pointer music-player-icon-" + ((playing && playingSong != null) ? "" : "hide")} fontSize="large" />
                    </div>
                    <div className="next-button" onClick={nextSong}>
                        <SkipNextIcon className="pointer music-player-icon" onClick={nextSong} />
                    </div>
                    <div className="repeat-button" onClick={toggleRepeat}>
                        <RepeatIcon className={"pointer music-player-" + (repeat ? "green" : "white")} />
                    </div>
                </div>
                <div className="center-bottom">
                    <div className="song-progress-bar">
                        <div className="current-song-time">{playingSong != null ? songTime(currentTime) : songTime(0)}</div>
                        <input
                            onChange={handleProgress}
                            value={duration && (playingSong != null) ? (currentTime * 100) / duration : 0}
                            type="range" 
                            name="progress-bar" 
                            className="progress-bar" />
                        <div className="total-song-time">{playingSong != null ? songTime(duration) : songTime(0)}</div>                       
                    </div>
                </div>
            </div>
            <div className="music-player-right">
                <Grid container spacing={3}>
                    <Grid item className="lyrics-box">
                        {songlist !== undefined && songlist.length > 0 && playingSong !== null ?
                        <Draggable>
                            <Lrc
                                lrc={songlist[playingSong].lyrics.replaceAll("\\n",'\n')}
                                currentTime={currentTime * 1000}
                                lineRenderer={lineRenderer}
                                className = {"music-player-lrc" + (lyricsBox ? "" : "-hide") +" lrc"}
                            />
                        </Draggable>
                        :
                        <div></div>
                        }
                        {lyricsBox ? 
                        <DescriptionIcon className="pointer lyrics-button" fontSize="default" onClick={() => toggleLyrics(!lyricsBox)} />
                        :
                        <DescriptionIconOutlined className="pointer lyrics-button" fontSize="default" onClick={() => toggleLyrics(!lyricsBox)} />
                        }
                    </Grid>
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