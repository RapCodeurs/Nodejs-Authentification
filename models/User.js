const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  user: {
    type: String,
    requiered: true,
    unique: true
  },
  email: {
    type: String,
    requiered: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    requiered: true,
  },
  role : {
    type: String,
    enum : ['user', 'admin'],
    default: 'user'
  }
}, {timestamps : true})

module.exports = mongoose.model('User', UserSchema)