import React, { useState,  useRef, useEffect } from "react";
import "../styles.css";
import "./AddSongPage.css";
import logo from "../Logo";
import NavBar from "./NavBar";
import Burger from "./Burger";
import { useOnClickOutside } from "./useOnClickOutside";

export default function AddSongPage() {
  const [username, setName] = useState("");
    useEffect(() => {
        let username = document.cookie.match(new RegExp('(^| )' + 'username' + '=([^;]+)'));
        if (username !== null) {
            setName(username[2]);
        }
    }, [username]);
  const [open, setOpen] = useState(false);
  const [PlaylistName, setPName] = useState("");
  const [SongArtist, setArtist] = useState("");
  const [SongLyric, setLyric] = useState("");
  const [SongFile, setFile] = useState("");
  const [errorMessage, setError] = useState("");
  const [Message, setMessage] = useState("");
  const [uploadFinished, setUploadFinished] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  const audioRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (uploadFinished) {
      let lyric = SongLyric.replaceAll("\n","\\\\n");
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation 
            { createPlaylist
              (title:"${PlaylistName}", user:"${username}") 
              {_id}
            }
            `,
        })
      
      })
        .then((response) => {
          if (response.ok) {
            setError("");
            return response.json();
          } else {
            setError(response.status + " " +  response.statusText);
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          //setMessage("Song with id "+ data.data.addSong._id +" is successfully added to database.");
          console.log(data);
        })
        .catch(error => setMessage("") );
      }
  }  

  return (
    <div className="AddSongPage main-theme">
      <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <NavBar open={open} setOpen={setOpen} />
      </div>
      <div className="AddSong main"> 
        <img 
          src={logo}
          alt="logo"
          className="icon"
        />
        <p>{Message}</p>
        <p className="error">{errorMessage}</p>
        <form className="complex_form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={PlaylistName}
            className="form_element input"
            placeholder="Enter playlist name"
            onChange={e => setPName(e.target.value)}
            required
          />
          <div>
            <button id="addplay" name="action" class="btn main-button-theme">
              Add Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}