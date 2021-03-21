const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const passport = require('passport');
const authenticate = require('./authenticate');
const mongoose = require('mongoose');

const User = require('./models/User');
const Song = require('./models/Song');
const Playlist = require('./models/Playlist');
const ObjectId = require('mongoose').Types.ObjectId; 
const { buildSchema } = require('graphql');
var enforce = require('express-sslify');
var cookieParser = require('cookie-parser')

const aws = require('aws-sdk');
aws.config.region = 'us-east-2';
const S3_BUCKET = process.env.S3_BUCKET;

const uri = "mongodb+srv://admin:mongo@cluster0.z0caj.mongodb.net/project?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log(err.message);
  else
    console.log('MongoDB Successfully Connected ...');
});

var schema = buildSchema(`
  type Song {
    _id: ID!
    songName: String
    artist: String
    filepath: String
    lyrics: String
  }
  type Playlist {
    _id: ID!
    title: String
    user: String
    songs: [Song]
  }
  type Query {
    getSongById(_id: ID!) : Song
    getAllSongs : [Song]
    getPlaylistById(_id: ID!) : Playlist
    getPlaylistsByUser(username: String) : [Playlist]
  }
  type Mutation {
    addSong(songName: String, artist: String, filepath: String, lyrics: String  ): Song
    deleteSongById(_id: ID!): Song
    createPlaylist(title: String, user: String): Playlist
    deletePlaylistById(_id: ID!): Playlist
    addSongToPlaylist(songId: ID!, playlistId: ID!): Playlist
    removeSongFromPlaylist(songId: ID!, playlistId: ID!): Playlist
  }
`);

var root = {
  getSongById: async (song) => {
    const data = await Song.findOne({_id :new ObjectId(song._id)});
    return data;
  },
  getAllSongs: async () => {
    const data = await Song.find({});
    return data;
  },
  getPlaylistById: async (playlist) => {
    const data = await Playlist.findOne({_id :new ObjectId(playlist._id)});
    return data;
  },
  getPlaylistsByUser: async (playlist) => {
    const data = await Playlist.find({user : playlist.username});
    return data;
  },
  addSong: async (song) => {
    var doc = {songName: song.songName ,artist: song.artist, filepath: song.filepath, lyrics: song.lyrics };
    const newSong = await Song.create(doc);
    return newSong;
  }, 
  deleteSongById: async (song) => {
    const deletedSong = await Song.findOneAndDelete({_id :new ObjectId(song._id)});
    await Playlist.updateMany(
      { },
      { $pull: { songs: {_id: ObjectId(song._id)}}},
      { multi: true }
    )
    return deletedSong;
  },
  createPlaylist: async (playlist) => {
    var doc = {title: playlist.title, user: playlist.user, songs:[]};
    const newPlaylist = await Playlist.create(doc);
    return newPlaylist;
  },
  deletePlaylistById: async (playlist) => {
    const deletedPlaylist = await Playlist.findOneAndDelete({_id :new ObjectId(playlist._id)});
    return deletedPlaylist;
  },
  addSongToPlaylist: async (req) => {
    const song = await Song.findOne({_id :new ObjectId(req.songId)});
    await Playlist.collection.update(
      { _id : ObjectId(req.playlistId)},
      { $pull: { songs: {_id: ObjectId(req.songId)}}}
    )
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.playlistId },
      { $push: {"songs": song}},
      { new: true }
    )
    return playlist;
  },
  removeSongFromPlaylist: async (req) => {
    const playlist = await Playlist.findOneAndUpdate(
      { _id : ObjectId(req.playlistId)},
      { $pull: { songs: {_id: ObjectId(req.songId)}}},
      { new: true }
    )
    return playlist;
  }, 
};
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser())



app.post('/signup', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    }
    else {
      passport.authenticate('local')(req, res, () => {
        const token = authenticate.generateToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.cookie('jwt', token , { expires: new Date(Date.now() + 500000), httpOnly: false, secure: true, sameSite:"strict" });
        res.cookie('username', req.user.username , { expires: new Date(Date.now() + 500000), httpOnly: false, secure: true, sameSite:"strict" });
        res.json({ token: token, status: 'Successfully Logged In' });
      });
    }
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.generateToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.cookie('jwt', token , { expires: new Date(Date.now() + 500000), httpOnly: true, secure: true, sameSite:"strict" });
  res.cookie('username', req.user.username , { expires: new Date(Date.now() + 500000), httpOnly: false, secure: true, sameSite:"strict" });
  res.json({ token: token, status: 'Successfully Logged In' });
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({
    accessKeyId: "process.env.AWSAccessKey",
    secretAccessKey: "process.env.AWSSecretKey"
  });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'c09',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://c09.s3.us-east-2.amazonaws.com/${fileName}`
    };
    res.json(returnData);
  });
});

app.use(
  '/graphql', 
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }),
);

app.use(enforce.HTTPS({ trustProtoHeader: true }))

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front-end/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

