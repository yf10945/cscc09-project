import "../styles.css";
import { withRouter } from "react-router";
import NavBar from "./NavBar";

export default function DisplayPlaylists() {
    return (
        <div className="DisplayPlaylists">
            <NavBar />
            <div className="main">
                <h1>My Playlists</h1>
            </div>
        </div>
      );
}