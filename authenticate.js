const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const key = "some-random-key";
// local strategy
exports.local = passport.use(new LocalStrategy({usernameField: 'username'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// JWT strategy
exports.generateToken = (user) => {
  // return jwt.sign(user, key, { expiresIn: 86400 });
  // temporary expire time below
  return jwt.sign(user, key);
};
var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: key
};
exports.jwtStrategy = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({id: jwt_payload.id}, function(err, user) {
    if (err) {
      return done(err, false);
  }
  if (user) {
      done(null, user);
  } else {
      done(null, false);
  }
});
}));
// verifying user
exports.verifyUser = passport.authenticate('jwt', { session: false });