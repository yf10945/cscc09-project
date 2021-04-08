import React, { useState } from 'react';
import PlayPauseButton from './PlayPauseButton';
import './SongListEntry.css';
import DeleteSongButton from './DeleteSongButton';
import { useDataLayerValue } from "../dataLayer";

function SongListEntry({ songlistentry, setSongs, getSongs, deleteSong, songs, playlistId }) {
    const [playVisible, setPlayVisible] = useState(false);
    const [{ playingSong, playingSongTitle, playingSongArtists}, dispatch] = useDataLayerValue();
    // console.log("songlistentry: " + songlistentry);
    // console.log("setSongs: " + setSongs);
    // console.log("SONG LIST ENTRY: " + JSON.stringify(songs));
    return (
        <tr className="song-box" id={songlistentry._id} onMouseEnter={() => setPlayVisible(songlistentry._id)} onMouseLeave={() => setPlayVisible('')}>
            {/* <div>Song ID: {songlistentry._id}</div> */}
            <td className="play-pause-button">
                <PlayPauseButton 
                    visible={playVisible === songlistentry._id}
                    songId={songlistentry._id}
                    song={songlistentry.filepath}
                    songTitle={songlistentry.songName}
                    songArtists={songlistentry.artist}
                    songs={songs} />
            </td>
            <td className="song-name">{songlistentry.songName}</td>
            <td className="artists">{songlistentry.artist}</td>
            <td>
                <DeleteSongButton song={songlistentry._id} setSongs={setSongs} deleteSong={deleteSong} getSongs={getSongs} playlistId={playlistId} />
            </td>
            {/* <div>File: {songlistentry.filepath}</div> */}
            {/* <div>Lyrics: {songlistentry.lyrics}</div>     */}
            {/* <audio
                controls
                src={songlistentry.filepath}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio> */}

        </tr>  
    );
}

export default SongListEntry
