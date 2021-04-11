import React, {useState, useRef, useEffect} from "react";
import "../styles.css";
import "./CreateRoomPage.css";
import { element } from "prop-types";
import { join } from "path";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function CreateRoomPage (props) {
    const [roomList, setRoomList] = useState([]);

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
                if (response.status === 401) {
                    throw new Error("Unauthorized!");
                }
            
            }
        })
        .then((data) => {
            let roomArray = data.data.getAllRooms;
            setRoomList(roomArray);
        })
        .catch(error => {
            if (error.message === "Unauthorized!") {
                props.history.push("/");
            }
        });
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
        <div className="room" key={element._id}>
            <div className="room-info"><strong>Room ID: </strong>{element._id}</div>
            <div className="room-info"><strong>Room Host:</strong> {element.host}</div>
            <div className="room-info"><strong>Currently Playing:</strong> {element.currentSong===null?"":element.currentSong}</div>
            <button className = "main-button-theme btn pointer" 
                        onClick = {()=>joinRoom(element._id)}>Join room </button>
        </div>)
        ;
    return (
        <div className="create-room-page main-theme">
            <div className="main">
                <h1>Karaoke Rooms</h1>
                <div 
                    className = "create-room" 
                    onClick = {createRoom}>
                    <AddCircleOutlineIcon fontSize="large" />
                    <div className="create-room-text">Create Room</div>
                </div>
                {roomListHTML}
            </div>
            <div className="footer"></div>
        </div>
      );

};

