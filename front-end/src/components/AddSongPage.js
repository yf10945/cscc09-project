// import "./styles.css";

export default function AddSongPage() {
  return (
    <div className="AddSongPage">
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
          required
        />
        <input
          type="text"
          name="SongArtist"
          className="form_element"
          placeholder="Enter the song artist"
          required
        />
        <label className="form_element">Select a file for the song:</label>
        <input
          type="file"
          id="SongFile"
          name="SongFile"
          className="form_element"
          accept="audio/*"
          required
        />
        <input
          type="textarea"
          name="SongLyric"
          className="form_element"
          placeholder="Enter the song lyric"
          required
        />
        <div>
          <button id="addsong" name="action" class="btn">
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}
