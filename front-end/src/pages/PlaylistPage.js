import React, { useState, useEffect } from "react";
import "../styles.css";
import "./PlaylistPage.css";
import SongList from "../components/SongList";
import { useDataLayerValue } from "../dataLayer";
import { useLocation } from "react-router-dom";

function PlaylistPage() {
    const [{ playingPlaylist, viewingPlaylist, songlist, playingSong, playingSongTitle, playingSongArtists }, dispatch] = useDataLayerValue();
    const [songs, setSongs] = useState([]);
    const location = useLocation();
    const playlistId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    // console.log(playlistId);

    const getPlaylistSongs = () => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query {
                        getPlaylistById(_id: "${playlistId}") {
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
        .then((response) => {
            // console.log(response.data.getPlaylistById);
            setSongs(response.data.getPlaylistById.songs);
            // console.log("SONG ARRAYY" + JSON.stringify(response.data.getPlaylistById.songs));
            dispatch({
                type: "VIEW_PLAYLIST",
                viewingPlaylist: response.data.getPlaylistById
            });
            dispatch({
                type: "SET_SONG",
                playingSong: null,
                playingSongTitle: null,
                playingSongArtists: null              
            });
            dispatch({
                type: "SET_SONGLIST",
                songlist: response.data.getPlaylistById.songs
            });
        })
        .catch(error => console.log(error));
    };

    const deleteSongFromPlaylist = (songId, setSongs, getPlaylistSongs, playlistId) => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        removeSongFromPlaylist(songId: "${songId}", playlistId: "${playlistId}") {
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
        .then((response) => {
            getPlaylistSongs(setSongs);
            dispatch({
                type: "SET_SONG",
                playingSong: null,
                playingSongTitle: null,
                playingSongArtists: null
            });
        })
        .catch(error => console.log(error));  
    };

    useEffect(() => {
        getPlaylistSongs();
    }, []);

    return (
        <div className="playlist-page main-theme">
            <div className="main">
                <h1 className="playlist-header">{viewingPlaylist == null ? "Loading..." : viewingPlaylist.title}</h1>
                <SongList
                    songs={songs}
                    setSongs={setSongs}
                    getSongs={getPlaylistSongs}
                    deleteSong={deleteSongFromPlaylist}
                    playlistId={viewingPlaylist == null ? null : viewingPlaylist._id} />
                {/* Add spacing between songs list and music control bar with footer*/}
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default PlaylistPage
