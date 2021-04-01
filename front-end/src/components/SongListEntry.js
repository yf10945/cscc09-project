import React, { useState } from 'react';
import PlayPauseButton from './PlayPauseButton';
import './SongListEntry.css';

const SongListEntry = (props) => {
    const { songlistentry } = props;
    const [playVisible, setPlayVisible] = useState(false);

    return (
        <tr class="song-box" id={songlistentry._id}>
            {/* <div>Song ID: {songlistentry._id}</div> */}
            <td onMouseEnter={() => setPlayVisible(songlistentry._id)} onMouseLeave={() => setPlayVisible('')} className="play-pause-button">
                <PlayPauseButton visible={playVisible === songlistentry._id} song={songlistentry._id} />
            </td>
            <td className="song-name">{songlistentry.songName}</td>
            <td className="artists">{songlistentry.artist}</td>
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
};

export default SongListEntry;
