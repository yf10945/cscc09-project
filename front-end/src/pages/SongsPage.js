import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import "./SongsPage.css";
import NavBar from "../components/NavBar";
import Burger from "../components/Burger";
import MusicPlayer from "../components/MusicPlayer";
import { useOnClickOutside } from "../components/useOnClickOutside";

function SongsPage() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    const getSongs = () => {
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
            let songsArray = data.data.getAllSongs;
            let songsList = document.querySelector(".songs-list");
            songsArray.forEach(element => {
                songsList.insertAdjacentHTML('beforeend',
                    `
                    <div class="song-box" id=${element._id}>
                        <div>Song ID: ${element._id}</div>
                        <div>Song Name: ${element.songName}</div>
                        <div>Artist: ${element.artist}</div>
                        <div>File: ${element.filepath}</div>
                        <div>Lyrics: ${element.lyrics}</div>    
                        <audio
                            controls
                            src="${element.filepath}">
                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>
                        <button onClick="deleteSong(element._id)">Delete</button>
                    </div>                
                    `
                );
            });
        });
    };

    const deleteSong = (id) => {
        fetch('./graphql', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        deleteOneSong(query: { _id: ${id}}) {
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
            let deletedSong = document.getElementById(id);
            deletedSong.remove();
        }).catch(error => console.log(error) );
    };

    useEffect(() => {
        // code to run on component mount
        getSongs();
    }, []);

    return (
        <div className="songs-page main-theme">
            <div className="main">
                <h1>Your Songs</h1>
                <div className="songs-list"></div>
                <div className="footer"></div>
            </div>
            <div ref={node}>
                <Burger open={open} setOpen={setOpen} />
                <NavBar open={open} setOpen={setOpen} />
            </div>
            <MusicPlayer />
        </div>
    )
}

export default SongsPage
