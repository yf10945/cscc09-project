import React from 'react';
import AddSongListEntry from './AddSongListEntry';
import "./AddSongList.css";

function AddSongList({ songs, addSong, playlistId, getSongs, playlistSongs, setPlaylistSongs, getAddSongs, addSongs, setAddSongs }) {
    return (
        <div className="add-song-list">
            {songs.length <= 0 ? (
                <p className="no-songs">No songs to add.</p>
            ) : (
                <table>              
                    <thead>
                        {/* <tr className="add-song-table-labels">
                            <th className="add-song-button-header"></th>
                            <th className="song-name-header">Title</th>
                            <th className="artists-header">Artist(s)</th>
                        </tr> */}
                    </thead>
                    <tbody>
                        {songs.map((songlistentry) => (
                            <AddSongListEntry
                                key={songlistentry._id}
                                songlistentry={songlistentry}
                                songs={songs}
                                playlistId={playlistId}
                                addSong={addSong}
                                getSongs={getSongs}
                                playlistSongs={playlistSongs}
                                setPlaylistSongs={setPlaylistSongs}
                                getAddSongs={getAddSongs}
                                addSongs={addSongs}
                                setAddSongs={setAddSongs}
                                />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AddSongList
