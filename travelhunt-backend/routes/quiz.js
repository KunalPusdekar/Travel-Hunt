const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const adminAuth = require('../middleware/adminAuth');

// POST: Create a new quiz (only accessible by admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, questions, city, points } = req.body;

    const newQuiz = new Quiz({
      title,
      questions,
      city,
      points
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
});

// GET: Fetch quizzes by city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const quizzes = await Quiz.find({ city });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this city' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
});

// GET: Fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
});

module.exports = router;
