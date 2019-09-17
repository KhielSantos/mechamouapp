const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String, 
    default: 'http://www.gravatar.com/avatar/046f3b022cf5abc9fc7958aa8b594ee1?s=200&r=pg&d=mm'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);