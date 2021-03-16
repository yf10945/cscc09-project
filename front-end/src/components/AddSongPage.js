import React, { useState } from "react";
import "../styles.css";
import NavBar from "./NavBar";
import Burger from "./Burger";

export default function AddSongPage() {
  const [open, setOpen] = useState(false);
  const [SongName, setName] = useState("");
  const [SongArtist, setArtist] = useState("");
  const [SongLyric, setLyric] = useState("");
  const [SongFile, setFile] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation 
          { addSong
            (songName:"${SongName}", artist:"${SongArtist}", lyrics:"${SongLyric}", filepath:"${SongFile}") 
            {_id}
          }
          `,
      })
     
     
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }  

  const handleFileUpload = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    getSignedRequest(e.target.files[0]);
  };

  const uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          setFile(url);
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  const getSignedRequest = (file) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log(xhr.response);
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }



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
        <form className="complex_form" onSubmit={handleSubmit}>
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