import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteSongButton({ song, setSongs }) {
    const getSongs = (setSongs) => {
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        getAllSongs {
                            _id
                            songName
                            artist
                            filepath
                            lyrics
                        }
                    }
                `,
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((data) => {
            setSongs(data.data.getAllSongs);
        })
        .catch(error => console.log(error));
    };

    const deleteSong = (id, setSongs) => {
        fetch('./graphql', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        deleteSongById( _id: "${id}") {
                            _id
                            songName
                            artist
                            filepath
                            lyrics
                        }
                    }
                `
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((data) => {
            // console.log(data);
            getSongs(setSongs);
        })
        .catch(error => console.log(error));
    };

    return (
        <div className="delete-song-button">
            <DeleteIcon className="delete-icon" onClick={() => deleteSong(song, setSongs)} />
        </div>
    )
}

export default DeleteSongButton
