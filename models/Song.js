const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema({
  songName: {type:String},
  artist: {type:String},
  filepath: {type:String},
  lyrics: {type:String} 
  
},{ collection : 'songs' });

module.exports = new mongoose.model('Song', songSchema);
  