import AddSongPage from "./AddSongPage";
import LoginPage from "./LoginPage";
import AboutUsPage from "./AboutUsPage";
import "./styles.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "AboutUs"
    };
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToAddSong = this.redirectToAddSong.bind(this);
    this.redirectToAboutUs = this.redirectToAboutUs.bind(this);
  }

  redirectToLogin() {
    this.setState({
      currentPage: "Login"
    });
  }

  redirectToAddSong() {
    this.setState({
      currentPage: "AddSong"
    });
  }

  redirectToAboutUs() {
    this.setState({
      currentPage: "AboutUs"
    });
  }

  render() {
    let page = null;
    if (this.state.currentPage === "Login") {
      page = <LoginPage />;
    } else if (this.state.currentPage === "AddSong") {
      page = <AddSongPage />;
    } else if (this.state.currentPage === "AboutUs") {
      page = <AboutUsPage />;
    }
    return (
      <div className="App">
        {page}
        <button onClick={this.redirectToLogin}>Login</button>
        <button onClick={this.redirectToAddSong}>AddSong</button>
        <button onClick={this.redirectToAboutUs}>AboutUs</button>
      </div>
    );
  }
}
export default App;