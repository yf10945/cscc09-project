import React, { useState } from 'react';
import './AddSongListEntry.css';
import { useDataLayerValue } from "../dataLayer";
import AddSongButton from './AddSongButton';

function SongListEntry({ songlistentry, songs, playlistId, addSong, getSongs, playlistSongs, setPlaylistSongs, getAddSongs, addSongs, setAddSongs }) {
    const [playVisible, setPlayVisible] = useState(false);
    const [{ playingSong, playingSongTitle, playingSongArtists}, dispatch] = useDataLayerValue();
    return (
        <tr className="add-song-box" id={songlistentry._id} onMouseEnter={() => setPlayVisible(songlistentry._id)} onMouseLeave={() => setPlayVisible('')}>
            {/* <div>Song ID: {songlistentry._id}</div> */}
            <td className="play-pause-button">
                <AddSongButton
                    songId={songlistentry._id}
                    playlistId={playlistId}
                    addSong={addSong}
                    visible={playVisible === songlistentry._id}
                    getSongs={getSongs}
                    playlistSongs={playlistSongs}
                    setPlaylistSong={setPlaylistSongs}
                    getAddSongs={getAddSongs}
                    addSongs={addSongs}
                    setAddSongs={setAddSongs}
                />
            </td>
            <td className="song-name">{songlistentry.songName}</td>
            <td className="artists">{songlistentry.artist}</td>
        </tr>  
    );
}

export default SongListEntry
