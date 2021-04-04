  
import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "../styles.css";
import "./RoomPage.css";
import { Lrc, parseLrc } from '@mebtte/react-lrc';

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 3,
    width: window.innerWidth / 3
};


const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const lrcRef = useRef();
    const [prevTime, setTime] = useState(0);
    const [songs, setSongs] = useState([]);
    const [songLyric, setLyric] = useState("");
    const [songUrl, setSongurl] = useState("");
    const audioPlayer = useRef();
    const roomID = props.match.params.roomID;

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
                throw new Error(response.statusText);
            }
        })
        .then((data) => {
            let songsArray = data.data.getAllSongs;
            setSongs(songsArray);
        });
    };
    
    useEffect(() => {
        getSongs();
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video:true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
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
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
        socketRef.current.on("play audio", data => {
            if (data.roomId === roomID) {
                audioPlayer.current.play();
            }
         });
        socketRef.current.on("pause audio", data => {
            if (data.roomId === roomID) {
                audioPlayer.current.pause();
            }
         });
         socketRef.current.on("set audio time", data => {
            if (data.roomId === roomID) {
                audioPlayer.current.currentTime = data.time;
                setTime(data.time);
            }
         });
         socketRef.current.on("set song file", data => {
            if (data.roomId === roomID) {
                setSongurl(data.filepath);
                audioPlayer.current.load();
            }
         });
         socketRef.current.on("set lyrics", data => {
            if (data.roomId === roomID) {
                let lyric = data.lyrics.replaceAll("\\n",'\n');
                setLyric(lyric);
            }
         });
//          console.log(audioPlayer.current.currentTime);
//          console.log(songLyric); 
//          console.log(parseLrc(songLyric))
    }, []);

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
        socketRef.current.emit("send play signal", {roomId: roomID});
    }

    function setPause() {
        socketRef.current.emit("send pause signal", {roomId: roomID});
    }

    function setAudioTime() {
        if (Math.abs(audioPlayer.current.currentTime - prevTime) > 1) {
            let time = audioPlayer.current.currentTime;
            audioPlayer.current.load();
            audioPlayer.current.pause();
            setTimeout(function() {
                socketRef.current.emit("send change time signal", {roomId:roomID, time: time});
            }, 1000 )   
            setTime(time);
        }
        setTime(audioPlayer.current.currentTime);
    }

    function changeTrack(filepath, lyrics) {
        socketRef.current.emit("set song file signal",{roomId:roomID, filepath:filepath} );
        socketRef.current.emit("set lyrics signal", {roomId:roomID, lyrics:lyrics});
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


    const songsHTML = songs.map((element) =>
    <div className="songs-box" key={element._id}>
        <div>Song ID: {element._id}</div>
        <div>Song name: {element.songName}</div>
        <div>Song artist: {element.artist}</div>
        <div>Song file: {element.filepath}</div>
        <button className = "btn" 
                    onClick = {()=>changeTrack(element.filepath, element.lyrics)}>Change Song </button>
    </div>)
    ;

    return (
        <div className="room-page main-theme">
        <div className="main">
        <div>
            <video muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
            <audio controls ref={audioPlayer} onPlay={setPlay} onPause={setPause} onTimeUpdate={setAudioTime} room={roomID} src={songUrl}></audio>
            <Lrc
                ref={lrcRef}
                lrc={songLyric}
                currentTime={prevTime*1000}
                lineRenderer={lineRenderer}

//                 onCurrentLineChange={onCurrentLineChange}

                className = "lrc"
            />
            {songsHTML}
        </div>
  
        </div>
      </div>
  );
};

export default Room;