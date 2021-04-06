import React, { useState, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import MusicPlayer from "./components/MusicPlayer";
import NavBar from "./components/NavBar";
import Burger from "./components/Burger";
import { useOnClickOutside } from "./components/useOnClickOutside";
import PlaylistsPage from "./pages/PlaylistsPage";
import { createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffffff"
      }
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
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
          <Route path="/playlists" component={PlaylistsPage} />
          <Route path="/404" component={PageNotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <MusicPlayer />
        {/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}
        <div ref={node} className="burger-menu">
          <Burger open={open} setOpen={setOpen} />
          <NavBar open={open} setOpen={setOpen} />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
