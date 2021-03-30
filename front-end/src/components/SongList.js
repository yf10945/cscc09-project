import React from 'react';
import SongListEntry from './SongListEntry';

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
            {songs.map((songlistentry) => (
                <SongListEntry key={songlistentry._id} songlistentry={songlistentry} />
            ))}
        </div>
    )
}

export default SongList
