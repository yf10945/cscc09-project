import React from 'react';
import './SongListEntry.css';

const SongListEntry = (props) => {
    const { songlistentry } = props;
    return (
        <div class="song-box" id={songlistentry._id}>
            {/* <div>Song ID: {songlistentry._id}</div> */}
            <div>Song Name: {songlistentry.songName}</div>
            <div>Artist: {songlistentry.artist}</div>
            {/* <div>File: {songlistentry.filepath}</div> */}
            {/* <div>Lyrics: {songlistentry.lyrics}</div>     */}
            <audio
                controls
                src={songlistentry.filepath}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
            <button onClick="deleteSong(element._id)">Delete</button>
        </div>  
    );
};

export default SongListEntry;
