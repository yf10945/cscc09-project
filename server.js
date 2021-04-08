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
const Room = require('./models/Room');
const ObjectId = require('mongoose').Types.ObjectId; 
const { buildSchema } = require('graphql');
var enforce = require('express-sslify');
var cookieParser = require('cookie-parser');

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
  type Room {
    _id: ID!
    host: String
    users: [String]
    currentSong: Song
    queue: [Song]
  }
  type Query {
    getSongById(_id: ID!) : Song
    getAllSongs : [Song]
    getPlaylistById(_id: ID!) : Playlist
    getPlaylistsByUser(username: String) : [Playlist]
    getAllRooms: [Room]
  }
  type Mutation {
    addSong(songName: String, artist: String, filepath: String, lyrics: String  ): Song
    deleteSongById(_id: ID!): Song
    createPlaylist(title: String, user: String): Playlist
    deletePlaylistById(_id: ID!): Playlist
    addSongToPlaylist(songId: ID!, playlistId: ID!): Playlist
    removeSongFromPlaylist(songId: ID!, playlistId: ID!): Playlist
    createRoom(host: String): Room
    deleteRoom(_id: ID!): Room
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
  getAllRooms: async () => {
    const data = await Room.find({});
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
  createRoom: async (req)  => {
    var doc = {host: req.host, user: [req.host], song: null, queue:[] };
    const newRoom = await Room.create(doc);
    return newRoom;
  },
  deleteRoom: async (req) => {
    const deletedRoom = await Room.findOneAndDelete({_id :new ObjectId(req._id)});
    return deletedRoom;
  }
};

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());


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
  res.cookie('jwt', token , { expires: new Date(Date.now() + 5000000000), httpOnly: true, secure: true, sameSite:"strict" });
  res.cookie('username', req.user.username , { expires: new Date(Date.now() + 5000000000), httpOnly: false, secure: true, sameSite:"strict" });
  res.json({ token: token, status: 'Successfully Logged In' });
});
const { 
  v4: uuidv4,
} = require('uuid');

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({
    accessKeyId: "process.env.AWSAccessKey",
    secretAccessKey: "process.env.AWSSecretKey"
  });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'c09',
    Key: uuidv4(),
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
      url: `https://c09.s3.us-east-2.amazonaws.com/${s3Params.Key}`
    };
    res.json(returnData);
  });
});

app.use(
  '/graphql', authenticate.verifyUser,
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
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);
const users = {};

const socketToRoom = {};

io.on('connection', socket => {
  
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });


    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on("send play signal", payload => {
      io.emit("play audio", {roomId: payload.roomId});
    });

    socket.on("send pause signal", payload => {
      io.emit("pause audio", {roomId: payload.roomId});
    });
    
    socket.on("send change time signal", payload => {
      io.emit("set audio time", {roomId: payload.roomId, time: payload.time});
    });

    socket.on("set song file signal", payload => {
      io.emit("set song file", {roomId: payload.roomId, filepath: payload.filepath});
    });

    socket.on("set lyrics signal", payload => {
      io.emit("set lyrics", {roomId: payload.roomId, lyrics: payload.lyrics});
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
            io.emit("user disconnected", {id: socket.id});
        }
    });

});

server.listen(port, () => console.log(`Listening on port ${port}`));
