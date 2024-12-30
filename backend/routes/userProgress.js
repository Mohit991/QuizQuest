const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

router.get('/:userId', userProgressController.getUserProgress);
router.post('/', userProgressController.addUserProgress);

module.exports = router;
