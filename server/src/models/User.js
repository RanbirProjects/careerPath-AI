const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  interests: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  goals: [{
    type: String
  }],
  careerPaths: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CareerPath'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 