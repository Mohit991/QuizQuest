const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');

// Route to get the leaderboard for a specific category
router.get('/:categoryId', getLeaderboard);

module.exports = router;
