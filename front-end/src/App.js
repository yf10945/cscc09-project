import React from "react";
import { Switch, Route } from "react-router-dom";
import AddSongPage from "./pages/AddSongPage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUsPage";
import Dashboard from "./pages/DashboardPage";
import "./styles.css";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import RoomPage from "./pages/RoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import SongsPage from "./pages/SongsPage";


function App() {

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/aboutus" component={AboutUsPage} />
        <Route path="/addsong" component={AddSongPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/rooms" exact component={CreateRoomPage} />
        <Route path="/rooms/room/:roomID" component={RoomPage} />
        <Route path="/songs" component={SongsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
