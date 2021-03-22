import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import "./SongsPage.css";
import NavBar from "./NavBar";
import Burger from "./Burger";
import MusicPlayer from "./MusicPlayer";
import { useOnClickOutside } from "./useOnClickOutside";

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
                    <div class="song-box">
                        <div>Song ID: ${element._id}</div>
                        <div>Song Name: ${element.songName}</div>
                        <div>Artist: ${element.artist}</div>
                        <div>File: ${element.filepath}</div>
                        <div>Lyrics: ${element.lyrics}</div>    
                    </div>                
                    `
                );
            });
        });
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
