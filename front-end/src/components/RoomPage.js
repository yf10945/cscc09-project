  
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "../styles.css";
import NavBar from "./NavBar";
import Burger from "./Burger";
import { useOnClickOutside } from "./useOnClickOutside";


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
    const [prevTime, setTime] = useState();
    const [songUrl, setSongurl] = useState('https://c09.s3.us-east-2.amazonaws.com/Aimer%20-%20Hana%20no%20Uta.mp3');
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    const audioPlayer = useRef();
    const roomID = props.match.params.roomID;

    useEffect(() => {
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



    return (
        <div className="dashboard main-theme">
        <div className="main">
        <div>
            <video muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
            <audio controls ref={audioPlayer} onPlay={setPlay} onPause={setPause} onTimeUpdate={setAudioTime} room={roomID} src={songUrl}></audio>
        </div>
  
        </div>
        {/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}
        <div ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <NavBar open={open} setOpen={setOpen} />
        </div>
      </div>
  );
};

export default Room;