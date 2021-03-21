import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import NavBar from "./NavBar";
import Burger from "./Burger";
import { useOnClickOutside } from "./useOnClickOutside";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
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
        })
        .catch(error => {} );
    }
    useEffect(() => {
        // code to run on component mount
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
            let roomList = document.querySelector(".RoomList");
            roomArray.forEach(element => roomList.insertAdjacentHTML('beforeend',
              `<div>Room ID: ${element._id}</div>
               <div>Room Host: ${element.host}</div>
               <div>Currently Playing: ${element.currentSong===null?"":element.currentSong}</div>`));
        })
        .catch(error => console.log(error) );
          

      }, [])

    return (
        <div className="dashboard main-theme">
            <div className="main">
                <button className = "btn" 
                        onClick = {createRoom}> Create a room </button>
                <div className="RoomList"></div>
            </div>
            {/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}
            <div ref={node}>
                <Burger open={open} setOpen={setOpen} />
                <NavBar open={open} setOpen={setOpen} />
            </div>
        </div>
      );
}