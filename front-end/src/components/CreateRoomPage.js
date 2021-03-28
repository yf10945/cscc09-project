import React, {useState, useRef, useEffect} from "react";
import "../styles.css";
import NavBar from "./NavBar";
import Burger from "./Burger";
import { useOnClickOutside } from "./useOnClickOutside";
import { element } from "prop-types";
import { join } from "path";

export default function CreateRoomPage (props) {
    const [open, setOpen] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    const getRooms = () => {
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              query: `
                    query {
                    getAllRooms {
                        _id
                        host
                        users
                        currentSong {
                        songName
                        artist
                        filepath
                        lyrics
                        }
                        queue {
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
        .then((data) => {
            let roomArray = data.data.getAllRooms;
            setRoomList(roomArray);
        })
        .catch(error => console.log(error) );
    }

    const createRoom = () => {
        let username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              query: `
                mutation 
                { createRoom
                  (host:"${username}") 
                  {_id}
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
            const id = data.data.createRoom._id
            props.history.push(`rooms/room/${id}`);
        })
        .catch(error => {} );
    }
    useEffect(() => {
        // code to run on component mount
        getRooms();
      }, [])
    const joinRoom = (_id) => {
        props.history.push(`rooms/room/${_id}`);
    }
    const roomListHTML = roomList.map((element) =>
        <div className="Room" key={element._id}>
            <div>Room ID: {element._id}</div>
            <div>Room Host: {element.host}</div>
            <div>Currently Playing: {element.currentSong===null?"":element.currentSong}</div>
            <button className = "btn" 
                        onClick = {()=>joinRoom(element._id)}>Join room </button>
        </div>)
        ;
    return (
        <div className="dashboard main-theme">
            <div className="main">
                <button className = "btn" 
                        onClick = {createRoom}> Create a room </button>
                {roomListHTML}
            </div>
            {/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}
            <div ref={node}>
                <Burger open={open} setOpen={setOpen} />
                <NavBar open={open} setOpen={setOpen} />
            </div>
        </div>
      );

};

