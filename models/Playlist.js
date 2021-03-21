const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema({
    songName: {type:String},
    artist: {type:String},
    filepath: {type:String},
    lyrics: {type:String} 
    
  },{ collection : 'songs' });
  
const playlistSchema = new Schema({
  title: {type:String},
  songs: [songSchema],
  user: {type:String} 
  
},{ collection : 'playlists' });

module.exports = new mongoose.model('Playlist', playlistSchema);
  