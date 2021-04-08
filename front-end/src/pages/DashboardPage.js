import React from "react";
import "../styles.css";
import "./DashboardPage.css";
import { Link } from 'react-router-dom';
import { Add, Chat, LibraryMusic, MusicNote } from '@material-ui/icons';
function DashboardPage() {

    return (
        <div className="dashboard main-theme">
            <div className="main">
                <h1>Welcome</h1>
                <div className="description-box">
                    <div className="link">
                        <h4>
                            <Link to="/rooms" className="dashboard-link main-theme">
                                Karaoke Rooms 🎤
                            </Link>
                        </h4>
                        <div className="description">Karaoke in a virtual room!</div>
                    </div>
                    <div className="link">
                        <h4>
                            <Link to="/songs" className="dashboard-link main-theme">
                                Songs 🎵
                            </Link>
                        </h4>
                        <div className="description">Browse available songs!</div>
                    </div>
                    <div className="link">
                        <h4>
                            <Link to="/playlists" className="dashboard-link main-theme">
                                Playlists 🧾
                            </Link>
                        </h4>
                        <div className="description">Manage your playlists!</div>
                    </div>
                    <div className="link">
                        <h4>
                            <Link to="/addsong" className="dashboard-link main-theme">
                                Add Song ➕
                            </Link>
                        </h4>
                        <div className="description">Add a song to the pool!</div>
                    </div>
                </div>            
            </div>
        </div>
      );
}

export default DashboardPage