const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const passport = require('passport');
const authenticate = require('./authenticate');
const mongoose = require('mongoose');

const User = require('./models/User');
const Song = require('./models/Song');
const ObjectId = require('mongoose').Types.ObjectId; 
const { buildSchema } = require('graphql');

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
  type Query {
    getSongById(_id: ID!) : Song
  }
  type Mutation {
    addSong(songName: String, artist: String, filepath: String, lyrics: String  ): Song
  }
`);

var root = {
  getSongById: async (song) => {
    const data = await Song.findOne({_id :new ObjectId(song._id)});
    return data;
  },
  addSong: async (song) => {
    var doc = {songName: song.songName ,artist: song.artist, filepath: song.filepath, lyrics: song.lyrics };
    const newSong = await Song.create(doc);
    return newSong;
  }
};
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());


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
        res.json({ token: token, status: 'Successfully Logged In' });
      });
    }
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.generateToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ token: token, status: 'Successfully Logged In' });
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
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
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
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



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front-end/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

