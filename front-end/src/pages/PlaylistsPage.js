import React, { useState, useEffect } from "react";
import "../styles.css";
import "./PlaylistsPage.css";
import { useDataLayerValue } from "../dataLayer";
import PlaylistList from "../components/PlaylistList";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@material-ui/core";


function PlaylistsPage() {
    const [{ user }, dispatch] = useDataLayerValue();
    const [playlists, setPlaylists] = useState([]);
    const [open, setOpen] = useState(false);
    const [playlistTitle, setPlaylistTitle] = useState("");
    var titleRef = {};

    const openCreatePlaylists = () => {
        setOpen(true);
    };

    const closeCreatePlaylists = () => {
        setOpen(false);
    };  

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
            // console.log(username);
            // console.log(user);
            // console.log(response.data.getPlaylistsByUser);
            setPlaylists(response.data.getPlaylistsByUser);
        })
        .catch(error => console.log(error));
    };

    const createPlaylist = () => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"                
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createPlaylist(title: "${playlistTitle}", user: "${user}") {
                            _id
                            title
                            user
                            songs {
                                _id
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
            console.log(response.data.createPlaylist);
            getPlaylists(user);
            closeCreatePlaylists();
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
                <div className="create-playlist" onClick={openCreatePlaylists}>
                    <AddCircleOutlineIcon fontSize="large" />
                    <div className="create-playlist-text">Create Playlist</div>
                </div>
                <Dialog
                    open={open}
                    onClose={closeCreatePlaylists} 
                    className="create-playlists-form"
                    PaperProps={{
                        style: {
                            borderRadius: "10px",
                            width: "25vw",
                            height: "25vh",
                        },
                    }}>
                    <DialogTitle className="create-playlists-form-title">Create Playlist</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            inputRef={titleRef}
                            margin="dense"
                            id="playlist-name"
                            label="Playlist Name"
                            type="text"
                            fullWidth={true}
                            className="create-playlist-form-label"
                            onChange={(e) => {setPlaylistTitle(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeCreatePlaylists} className="form-button">
                            Cancel
                        </Button>
                        <Button onClick={() => {if (titleRef.current.reportValidity()) createPlaylist()}} className="form-button">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <PlaylistList playlists={playlists} setPlaylists={setPlaylists} />
                {/* Add spacing between playlists list and music control bar with footer*/}
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default PlaylistsPage
