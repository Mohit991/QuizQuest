
const express = require('express');
const router = express.Router();
const questionsCountForQuizController = require('../controllers/questionsCountForQuizController');

router.get('/', questionsCountForQuizController.getQuestionCounts);
router.post('/', questionsCountForQuizController.createQuestionCount);

module.exports = router;