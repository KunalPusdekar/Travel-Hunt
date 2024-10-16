const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ optionText: { type: String, required: true } }],
      correctAnswer: { type: String, required: true },
    },
  ],
  points: {
    type: Number,
    required: true, // Points for completing the quiz
  },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
