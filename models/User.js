const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { string } = require('prop-types');
const Schema = mongoose.Schema;
const userSchema = new Schema({
});

userSchema.plugin(passportLocalMongoose);
  
module.exports = mongoose.model('User', userSchema);
