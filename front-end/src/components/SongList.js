import React from 'react';
import SongListEntry from './SongListEntry';
import "./SongList.css";

function SongList({ songs }) {
    // no-db mock data for testing
    // const renderSongs = [
    //     {
    //         _id: '1',
    //         songName: 'song name',
    //         artist: 'artists',
    //         filepath: 'filepath here',
    //         lyrics: 'lyrics here',
    //     },
    //     {
    //         _id: '2',
    //         songName: 'song name 2',
    //         artist: 'artists 2',
    //         filepath: 'filepath here 2',
    //         lyrics: 'lyrics here 2',
    //     }
    // ];
    return (
        <div class="song-list">
            {songs.length <= 0 ? (
                <p className="no-songs">You currently have no songs.</p>
            ) : (
                <table>
                    <thead>
                        <tr className="table-labels">
                            <th className="play-pause-button-header" />
                            <th className="song-name-header">Title</th>
                            <th className="artists-header">Artist(s)</th>
                            {/* <th>Duration</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((songlistentry) => (
                            <SongListEntry key={songlistentry._id} songlistentry={songlistentry} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SongList
