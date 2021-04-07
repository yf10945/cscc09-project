import React, { useState, useEffect } from "react";
import "../styles.css";
import "./SongsPage.css";
import SongList from "../components/SongList";
import { useDataLayerValue } from "../dataLayer";

function SongsPage(props) {
    const [{ songlist }, dispatch] = useDataLayerValue();
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
                if (response.status === 401) {
                    throw new Error("Unauthorized!");
                } else {
                    throw new Error(response.statusText);
                }
            }
        })
        .then((data) => {
            // console.log(data.data.getAllSongs);
            setSongs(data.data.getAllSongs);
            dispatch({
                type: "SET_SONGLIST",
                songlist: data.data.getAllSongs
            });
            // console.log(songlist);
        })
        .catch(error => { 
            if (error.message === "Unauthorized!") {
                props.history.push("/");
            }
            console.log(error);
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
                <SongList songs={songs} setSongs={setSongs} />
                {/* Add spacing between songs list and music control bar with footer*/}
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default SongsPage
