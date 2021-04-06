import React, { useState, useEffect } from "react";
import "../styles.css";
import "./PlaylistsPage.css";
import { useDataLayerValue } from "../dataLayer";
import PlaylistList from "../components/PlaylistList";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


function PlaylistsPage() {
    const [{ user }, dispatch] = useDataLayerValue();
    const [playlists, setPlaylists] = useState([]);

    const getPlaylists = (username) => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query {
                        getPlaylistsByUser(username: "${username}") {
                        _id 
                        title 
                        user 
                        songs {
                            songName
                            artist
                            filepath
                            lyrics
                        }
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
        .then((response) => {
            console.log(username);
            console.log(user);
            console.log(response.data.getPlaylistsByUser);
            setPlaylists(response.data.getPlaylistsByUser);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        getPlaylists(user);
    }, [user]);

    return (
        <div className="playlists-page main-theme">
            <div className="main">
                <h1>Your Playlists</h1>
                <div className="create-playlist">
                    <AddCircleOutlineIcon fontSize="large" />
                    <div className="create-playlist-text">Create Playlist</div>
                </div>
                <PlaylistList playlists={playlists} setPlaylists={setPlaylists} />
                {/* Add spacing between playlists list and music control bar with footer*/}
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default PlaylistsPage
