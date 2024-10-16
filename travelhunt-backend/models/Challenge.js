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
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
