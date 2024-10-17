// challengeRoutes.js
const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const adminAuth = require('../middleware/adminAuth');

// POST: Create a new challenge (only accessible by admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, city, points, locationCoordinates, description, required = false } = req.body;

    const newChallenge = new Challenge({
      title,
      city,
      points,
      locationCoordinates,
      description,
      required
    });

    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
});

// GET: Fetch all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find({});

    if (challenges.length === 0) {
      return res.status(404).json({ message: 'No challenges found' });
    }

    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
});

// GET: Fetch challenges by city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const challenges = await Challenge.find({ city });

    if (challenges.length === 0) {
      return res.status(404).json({ message: 'No challenges found for this city' });
    }

    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
});

module.exports = router;
