const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    songName: {type:String},
    artist: {type:String},
    filepath: {type:String},
    lyrics: {type:String} 
    
  },{ collection : 'songs' });

  
const roomSchema = new Schema({
  host: {type:String}, 
  users: [String],
  cuurentSonng: songSchema,
  queue: [songSchema],
  
},{ collection : 'rooms' });

module.exports = new mongoose.model('Room', roomSchema);