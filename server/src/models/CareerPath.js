const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: [{
    type: String
  }],
  learningResources: [{
    title: String,
    type: String, // course, book, website, etc.
    url: String,
    description: String
  }],
  timeline: {
    type: Map,
    of: String // Key: milestone, Value: estimated time
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  jobMarket: {
    demand: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    growth: {
      type: Number, // Percentage
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerPath', careerPathSchema); 