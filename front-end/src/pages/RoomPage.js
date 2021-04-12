  
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "../styles.css";
import "./RoomPage.css";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { Lrc, useLrc } from '@mebtte/react-lrc';
import { useDataLayerValue } from "../dataLayer";

const Video = (props) => {
    const ref = useRef();
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })

        props.peer.on("close",  () => {
            setClosed(true);
        })
    }, []);

    return (
            closed ? null :
                <video className="othersVideo" playsInline autoPlay ref={ref}/>
            
    );
}


const RoomPage = (props) => {
    const [peers, setPeers] = useState([]);
    const [message, setMessage] = useState(" ");
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [paused,setPaused] = useState(true);
    const lrcRef = useRef();
    const [authorized, setAuthorized] = useState(false);
    const [prevTime, setTime] = useState(0);
    const [songs, setSongs] = useState([]);
    const songsRef = useRef();
    const sliderRef = useRef();
    const [currentSong, setCurrentSong] = useState(null);
    const currentPosRef = useRef();
    const [songLyric, setLyric] = useState("");
    const [songUrl, setSongurl] = useState("");
    const lyricRef = useRef("");
    const audioPlayer = useRef();
    const roomID = props.match.params.roomID;
    const [{ socket }, dispatch] = useDataLayerValue();

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
            setAuthorized(true);
            let songsArray = data.data.getAllSongs;
            setSongs(songsArray);
            if (songsArray.length > 0) {
                setCurrentSong(songsArray[0]);
            }
            songsRef.current = songsArray;
            currentPosRef.current = 0;
            init();
            
        })
        .catch((error) => {
            if (error.message === "Unauthorized!") {
                props.history.push("/");
            }
            console.log(error);
        })
    };
    useLayoutEffect(() => {
        if (socketRef.current) {
            socketRef.current.close();
        }
    },[])
    
    useEffect(() => {
        getSongs();
        console.log(audioPlayer.current);


//          console.log(audioPlayer.current.currentTime);
//          console.log(songLyric); 
//          console.log(parseLrc(songLyric))
    }, [audioPlayer]);

    function init() {
        socketRef.current = io.connect("/");
        dispatch({
            type: "SET_SOCKET",
            socket: socketRef            
        });
        navigator.mediaDevices.getUserMedia({ video:true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            setMessage("Welcome to the room!");
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                setMessage("Please wait, loading video streams for user in room.");
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                setMessage("Someone joined the room! Currently playing song will be paused.");
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   

                setPeers(users => [...users, peer]);
                loadSong();
            });


            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
        socketRef.current.on("play audio", data => {
            if (data.roomId === roomID) {
                setMessage("User in room has resumed the song.");
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
                if (audioPlayer.current) {
                    audioPlayer.current.play();
                }
               
            }
         });
        socketRef.current.on("pause audio", data => {
            if (data.roomId === roomID) {
                setMessage("User in room has paused the song.");
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
                if (audioPlayer.current) {
                    audioPlayer.current.pause();
                }
            }
         });
         socketRef.current.on("set audio time", data => {
            if (data.roomId === roomID) {
                setMessage(`User in room has changed the time to ${timeConverter(data.time)}`);
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
                if (audioPlayer.current) {
                    audioPlayer.current.pause();
                    if (Math.abs(audioPlayer.current.currentTime - data.time) > 2) { 
                        audioPlayer.current.currentTime = data.time;
                        setTime(data.time);
                    }
                }
            }
         });
         socketRef.current.on("set song file", data => {
            if (data.roomId === roomID) {
                setMessage(`User in room has changed the song. Lyrics is changed accordingly.`);
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
                setSongurl(data.filepath);
                if (audioPlayer.current) {
                    audioPlayer.current.load();
                }
            }
         });
         socketRef.current.on("set lyrics", data => {
            if (data.roomId === roomID) {
                let lyric = data.lyrics.replaceAll("\\n",'\n');
                setLyric(lyric);
                lyricRef.current= lyric;
            }
         });
         socketRef.current.on("room full", data => {
            setMessage(`Room is full, going back to list of rooms.`);
            setTimeout(function() {
                props.history.push(`/rooms`);
            }, 2000 )   
         });
         socketRef.current.on("user disconnected", data => {
            let i = peersRef.current.findIndex(peer => peer.peerID === data.id);
            let peerElement = peersRef.current.find(peer => peer.peerID === data.id);
            if (peerElement !== null && peerElement !== undefined) {
                if (peerElement.peer !== null) {
                    peerElement.peer.destroy();
                }
                peersRef.current.splice(i,1);
                setMessage(`An user has disconnected from the room.`);
                setTimeout(function() {
                    setMessage(" ");
                }, 2000 )   
            } 
         });
    }

    function createPeer(userToSignal, callerID, stream) {

        
        // or share using WebRTC
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function setPlay() {
        if (audioPlayer.current) {
            if (audioPlayer.current.readyState !== 0) {
                setPaused(false);
                let d = audioPlayer.current.duration;
                if (d !== 0) {
                    sliderRef.current.value = audioPlayer.current.currentTime*100/d;
                }
                socketRef.current.emit("send play signal", {roomId: roomID});
            }
        }
    }

    function setPause() {
        setPaused(true);
        socketRef.current.emit("send pause signal", {roomId: roomID});
    }

    function loadSong() {
        socketRef.current.emit("send pause signal", {roomId: roomID});
        if (audioPlayer.current) {
            if (audioPlayer.current.src !== "") {
                socketRef.current.emit("set song file signal",{roomId:roomID, filepath:audioPlayer.current.src});
            }
            
            if (lyricRef.current !== "") {
                socketRef.current.emit("set lyrics signal", {roomId:roomID, lyrics:lyricRef.current});
            }
            if (audioPlayer.current.currentTime !== 0) {
                socketRef.current.emit("send change time signal", {roomId:roomID, time: audioPlayer.current.currentTime});
            }
            sliderRef.current.value = 0;
        
        }
    }

    function setAudioTime() {
        if (audioPlayer.current) {
            if (Math.abs(audioPlayer.current.currentTime - prevTime) > 2) {
                let time = audioPlayer.current.currentTime;
                setTimeout(function() {
                    socketRef.current.emit("send change time signal", {roomId:roomID, time: time});
                }, 1000 )   
                setTime(time);
            }
            setTime(audioPlayer.current.currentTime);
            sliderRef.current.value = audioPlayer.current.currentTime*100/audioPlayer.current.duration;
       }
        
    }

    function changeTrack(filepath, lyrics) {
        socketRef.current.emit("set song file signal",{roomId:roomID, filepath:filepath} );
        socketRef.current.emit("set lyrics signal", {roomId:roomID, lyrics:lyrics});
    }

    function timeConverter(seconds) {
        let returnString = "";
        if (isNaN(seconds)) {
            returnString = "0.00";
        } else {
            let minute = Math.floor(seconds/60);
            let second = Math.floor(seconds%60);
            let returnedSeconds = second < 10 ? `0${second}` : `${second}`;
            returnString = minute.toString()+ ":" +returnedSeconds;
        }
        return returnString;
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

//       const onCurrentLineChange = useCallback((line) => console.log(line), []);
    
    function nextSong() {
        if (currentPosRef.current === songsRef.current.length-1) {
            currentPosRef.current = 0;
        } else {
            currentPosRef.current += 1;
        }
        setCurrentSong(songsRef.current[currentPosRef.current]);

    }

    function previousSong() {
        if (currentPosRef.current === 0) {
            currentPosRef.current = songsRef.current.length-1;
        } else {
            currentPosRef.current -= 1;
        }
        setCurrentSong(songsRef.current[currentPosRef.current]);
    }
    const audioPlayPause =  (paused) ?
        <div>
            <PlayCircleOutlineIcon className="karaoke-icon" onClick={setPlay}/>
        </div> : 
        <div>
              <PauseCircleOutlineIcon className="karaoke-icon" onClick={setPause}/>
        </div>
     ; 

    function handleSlide(e) {
        if (audioPlayer.current) {
            if (audioPlayer.current.paused&& audioPlayer.current.readyState !== 0) {
                let d = audioPlayer.current.duration;
                if (d !== 0) {
                    audioPlayer.current.currentTime = e.target.value*d/100;
                }
            } else {
                if (audioPlayer.current.readyState !== 0) {
                    setMessage("Please pause the song first before changing the time");
                    setTimeout(function() {
                        setMessage(" ");
                    }, 2000 )
                    let d = audioPlayer.current.duration;
                    if (d !== 0) {
                         e.target.value = audioPlayer.current.currentTime*100/d;
                    }
                }
            }
        }
    }
    const songsHTML = (currentSong===null) ? null :
    <div className="songs-box" key={currentSong._id}>
        <div className="song-info">
            <div className="song-name">{currentSong.songName}</div>
            <div className="song-artist">{currentSong.artist}</div>
        </div>
        <button className = "btn-blue" 
                    onClick = {()=>changeTrack(currentSong.filepath, currentSong.lyrics)}>
                    Change Song
        </button>
        </div>
    ;
    
    const duration = (!audioPlayer.current) ? "0.00" : timeConverter(audioPlayer.current.duration);

    const currentTimeString = (!audioPlayer.current) ? "0.00" : timeConverter(audioPlayer.current.currentTime);

    return (
        authorized ? 
        <div className="room-page main-theme">
        <div className="main">
        <div>
            <div className="message">
                {message}
            </div>
            <div className="videosContainer"> 
                <video className="uservideo" muted ref={userVideo} autoPlay playsInline />
                {peersRef.current.map((peerRef) =>
                        <Video key={peerRef.peerID} peer={peerRef.peer} />
                )}
            </div>
            <div className="audio-control">
            {audioPlayPause}
            {currentTimeString}
            <input ref={sliderRef} type="range"
            className="karaoke-slider" max="100" 
            onChange={handleSlide}/>
            {duration}
            </div>
            <audio
              ref={audioPlayer}
              onPlay={setPlay} onPause={setPause}
              onTimeUpdate={setAudioTime} room={roomID} src={songUrl}
            >
            </audio>
            <Lrc
                ref={lrcRef}
                lrc={songLyric}
                currentTime={prevTime*1000}
                lineRenderer={lineRenderer}
                autoScrollAfterUserScroll={0}
                // onCurrentLineChange={onCurrentLineChange}

                className = "karaoke-lrc"
            />
            <div className="song-outer">
                <div className="song-selection">
                    <div>
                        <SkipPreviousIcon className="karaoke-icon" onClick={previousSong} />
                    </div>
                    {songsHTML}
                    <div>
                        <SkipNextIcon className="karaoke-icon" onClick={nextSong} />
                    </div>
                </div>
            </div>


        </div>
        </div>
      </div> : <div> </div>
    

  );
};

export default RoomPage;