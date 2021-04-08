
import React, { useState,  useRef, useCallback } from "react";
import "../styles.css";
import "./AddSongPage.css";
import logo from "../Logo";
import { Lrc } from '@mebtte/react-lrc';

export default function AddSongPage(props) {
  const [SongName, setName] = useState("");
  const [SongArtist, setArtist] = useState("");
  const [SongLyric, setLyric] = useState("");
  const [SongFile, setFile] = useState("");
  const [prevTime, setTime] = useState(0);
  const [timeStamp, setTimeStamp] = useState("[00:00.00]");
  const [errorMessage, setError] = useState("");
  const [Message, setMessage] = useState("");
  const [uploadFinished, setUploadFinished] = useState(false);
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
            if (response.status === 401) {
              throw new Error("Unauthorized!");
            } else {
                throw new Error(response.statusText);
            }

          }
        })
        .then((data) => {
          setMessage("Song with id "+ data.data.addSong._id +" is successfully added to database.");
        })
        .catch(error => {
          setMessage("");
          if (error.message === "Unauthorized!") {
            props.history.push("/");
          }
        });
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

  const lineRenderer = useCallback(({ lrcLine, index, active }) => {
    const { content } = lrcLine;
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '10px 0',
          color: active ? 'green' : 'inherit',
          transform: `scale(${active ? 1.2 : 1})`,
          transition: 'transform 300ms',
        }}
      >
        {content}
      </div>
    );
  }, []);
  

  function setAudioTime() {
    setTime(audioRef.current.currentTime); 
    timeStampConverter(prevTime);
  }

  function timeStampConverter(time) {
    let minute = Math.floor(time/60);
    let second = Math.floor(time%60);
    let hundredth = (time%60 - Math.floor(time%60)).toFixed(2);
    let minuteString = minute.toString();
    if (minuteString.length === 1) {
      minuteString = "0"+ minuteString;
    }
    let secondString = second.toString();
    if (secondString.length === 1) {
      secondString = "0"+ secondString;
    }
    let hundredthString = hundredth.toString().slice(-3);;
    setTimeStamp("[" + minuteString+":"+secondString+hundredthString+"]");
  }

  return (
    <div className="AddSongPage main-theme">
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
            placeholder="Enter the song lyric in the following format:
[00:00.00]Line 1 lyrics
[00:17.20]Line 2 lyrics
[00:21.10]Line 3 lyrics
            "
            onChange={e => setLyric(e.target.value)}
            required
          />
          <div>
            <button id="addsong" name="action" className="btn main-button-theme">
              Add Song
            </button>
          </div>
        </form>
        <div className="preview">
          File preview:
          <audio controls ref={audioRef} onTimeUpdate={setAudioTime} >
            <source src={SongFile} type="audio/mp3"/> 
          Your browser does not support the audio element.
          </audio>
          <p>Current timestamp: {timeStamp}</p>
          Lyric Preview:
          <Lrc
                lrc={SongLyric}
                currentTime={prevTime*1000}
                lineRenderer={lineRenderer}
                className = "lrc"
            />
        </div>
      </div>
    </div>
  );
}