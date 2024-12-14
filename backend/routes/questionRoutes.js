const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.route('/:topicId/questions')
    .get(questionController.getAllQuestionsForATopic)

module.exports = router