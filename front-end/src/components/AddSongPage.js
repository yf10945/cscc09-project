import React, { useState } from "react";
import "../styles.css";
import NavBar from "./NavBar";

class AddSongPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songname: "",
      artist: "",
      file: null,
      lyrics: "",
      errorMessage: ""
    };
    this.addsong = this.addsong.bind(this);
    this.handleSongNameChange = this.handleSongNameChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleLyricChange = this.handleLyricChange.bind(this);
  }

  async addsong() {

  }
  
  handleSongNameChange(e) {
    this.setState({songname: e.target.value});
  }
  
  handleArtistChange(e) {
    this.setState({artist: e.target.value});
  }

  handleFileChange(e) {
    this.setState({file: e.target.files[0]});
  }

  handleLyricChange(e) {
    this.setState({lyrics: e.target.value});
  }
  
  render() {
  	return(
  	  <div className="AddSongPage main-theme">
      <div>
          <Burger open={open} setOpen={setOpen} />
          <NavBar open={open} setOpen={setOpen} />
      </div>
      <div className="main"> 
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_496903.png"
          alt="logo"
          className="icon"
        />
        <form class="complex_form">
          <input
            type="text"
            name="SongName"
            className="form_element"
            placeholder="Enter the song name"
            onChange={this.handleSongNameChange}
            required
          />
          <input
            type="text"
            name="SongArtist"
            className="form_element"
            placeholder="Enter the song artist"
            onChange={this.handleArtistChange}
            required
          />
          <label className="form_element">Select a file for the song:</label>
          <input
            type="file"
            id="SongFile"
            name="SongFile"
            className="form_element"
            accept="audio/*"
            onChange={this.handleFileChange}
            required
          />
          <textarea
            name="SongLyric"
            className="form_element"
            placeholder="Enter the song lyric"
            onChange={this.handleLyricChange}
            required
          />
          <div>
            <button id="addsong" name="action" class="btn">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
	})
}
export default AddSongPage;
