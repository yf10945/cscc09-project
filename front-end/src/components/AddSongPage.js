import React, { useState,  useRef } from "react";
import "../styles.css";
import "./AddSongPage.css";
import logo from "../Logo";
import NavBar from "./NavBar";
import Burger from "./Burger";
import { useOnClickOutside } from "./useOnClickOutside";

export default function AddSongPage() {
  const [open, setOpen] = useState(false);
  const [SongName, setName] = useState("");
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
            { addSong
              (songName:"${SongName}", artist:"${SongArtist}", lyrics:"${lyric}", filepath:"${SongFile}") 
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
          setMessage("Song with id "+ data.data.addSong._id +" is successfully added to database.");
        })
        .catch(error => setMessage("") );
      }
  }  

  const handleFileUpload = e => {
    setUploadFinished(false);
    setMessage("Uploading file, please wait...");
    setFile(e.target.files[0]);
    getSignedRequest(e.target.files[0]);
  };

  const uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          setFile(url);
          setUploadFinished(true);
          setMessage("Upload Finished!");
          if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.load();
          }
        }
        else{
          setMessage('Could not upload file.');
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
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          setMessage('Could not get signed URL.');
        }
      }
    };
    xhr.send();
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
            value={SongName}
            className="form_element input"
            placeholder="Enter the song name"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={SongArtist}
            className="form_element input"
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
            className="form_element input"
            placeholder="Enter the song lyric"
            onChange={e => setLyric(e.target.value)}
            required
          />
          File preview:
          <audio controls ref={audioRef}>
            <source src={SongFile} type="audio/mp3"/> 
          Your browser does not support the audio element.
          </audio>
          <div>
            <button id="addsong" name="action" class="btn main-button-theme">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}