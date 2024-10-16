const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,  // Assuming each user has a city
  },
  totalPoints: {
    type: Number,
    default: 0,  // Overall points (challenges + quizzes + location-based points)
  },
  locationsTraveled: [
    {
      locationName: { 
        type: String, 
        required: true,
      },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      pointsEarned: {
        type: Number,
        default: 0,  // Points earned by the user at this location
      },
      visitedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  challengesCompleted: [
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
      },
      status: {
        type: String,
        enum: ['in-progress', 'completed', 'failed'],
        default: 'in-progress',
      },
      completedAt: {
        type: Date,
        default: null,
      },
      pointsEarned: {
        type: Number,
        default: 0,
      },
    },
  ],
  quizAttempts: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
      score: {
        type: Number,
        default: 0,
      },
      completedAt: {
        type: Date,
        default: null,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
