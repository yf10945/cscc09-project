const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const passport = require('passport');
const authenticate = require('./authenticate');
const mongoose = require('mongoose');

const User = require('./models/User');
// temp schema 
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const uri = "mongodb+srv://admin:mongo@cluster0.z0caj.mongodb.net/project?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log(err.message)
  else
    console.log('MongoDB Successfully Connected ...');
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());


app.post('/signup', (req, res) => {
  User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
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

app.use(
  '/graphql', authenticate.verifyUser,
  graphqlHTTP({
    schema: schema
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