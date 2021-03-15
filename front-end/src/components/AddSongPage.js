import React, { useState } from "react";
import "../styles.css";
import NavBar from "./NavBar";
import Burger from "./Burger";

export default function AddSongPage() {
  const [open, setOpen] = useState(false);
  const [SongName, setName] = useState("");
  const [SongArtist, setArtist] = useState("");
  const [SongLyric, setLyric] = useState("");
  const [SongFile, setFile] = useState(null);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`{Submitting Name ${SongFile}`)
  }  

  const handleFileUpload = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className="AddSongPage main-theme">
      <div>
          <Burger open={open} setOpen={setOpen} />
          <NavBar open={open} setOpen={setOpen} />
      </div>
      <div className="main"> 
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_496903.png"
          alt="logo"
          className="icon"
        />
        <form class="complex_form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={SongName}
            className="form_element"
            placeholder="Enter the song name"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={SongArtist}
            className="form_element"
            placeholder="Enter the song artist"
            onChange={e => setArtist(e.target.value)}
            required
          />
          <label className="form_element">Select a file for the song:</label>
          <input
            type="file"
            id="SongFile"
            name="SongFile"
            className="form_element"
            accept="audio/*"
            onChange={handleFileUpload}
            required
          />
          <textarea
            value={SongLyric}
            className="form_element"
            placeholder="Enter the song lyric"
            onChange={e => setLyric(e.target.value)}
            required
          />
          <div>
            <button id="addsong" name="action" class="btn">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}