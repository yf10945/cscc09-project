import React, { useState } from 'react';
import PlayPauseButton from './PlayPauseButton';
import './SongListEntry.css';
import DeleteIcon from '@material-ui/icons/Delete';

const SongListEntry = (props) => {
    const { songlistentry } = props;
    const [playVisible, setPlayVisible] = useState(false);

    return (
        <tr class="song-box" id={songlistentry._id} onMouseEnter={() => setPlayVisible(songlistentry._id)} onMouseLeave={() => setPlayVisible('')}>
            {/* <div>Song ID: {songlistentry._id}</div> */}
            <td className="play-pause-button">
                <PlayPauseButton visible={playVisible === songlistentry._id} song={songlistentry._id} />
            </td>
            <td className="song-name">{songlistentry.songName}</td>
            <td className="artists">{songlistentry.artist}</td>
            <td>
                <DeleteIcon />
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
};

export default SongListEntry;
