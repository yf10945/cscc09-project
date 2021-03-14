import "../styles.css";
import { withRouter } from "react-router";
import NavBar from "./NavBar";

export default function Dashboard() {
    return (
        <div className="Dashboard">
            <NavBar />
            <div className="main">
                <h1>My Playlists</h1>
            </div>
        </div>
      );
}