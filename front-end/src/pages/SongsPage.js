import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import "./SongsPage.css";
import NavBar from "../components/NavBar";
import Burger from "../components/Burger";
import MusicPlayer from "../components/MusicPlayer";
import SongList from "../components/SongList";
import { useOnClickOutside } from "../components/useOnClickOutside";

function SongsPage() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    const [songs, setSongs] = useState([]);

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
            setSongs(data.data.getAllSongs);
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
                <SongList songs={songs} />
                {/* Add spacing between songs list and music control bar with footer*/}
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
