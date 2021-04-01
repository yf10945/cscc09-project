import React from 'react';
import "./MusicPlayer.css";
import "../styles.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";

function MusicPlayer() {
    return (
        <div className="music-player">
            <div className="music-player-left">
                <img src="" alt="" className="footer-album-logo"/>
                <div className="music-player-songInfo">
                    <h4>song title</h4>
                    <p>artist</p>
                </div>
            </div>
            <div className="music-player-center">
                <ShuffleIcon className="music-player-green" />
                <SkipPreviousIcon className="music-player-icon" />
                <PlayCircleOutlineIcon className="music-player-icon" fontSize="large" />
                <SkipNextIcon className="music-player-icon" />
                <RepeatIcon className="music-player-green" />
            </div>
            <div className="music-player-right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>           
        </div>
    )
}

export default MusicPlayer
