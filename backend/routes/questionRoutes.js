const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.route('/:topicId/questions').get(questionController.getAllQuestionsForATopic);
router.route('/:topicId/questions').post(questionController.addQuestionsForATopic);
router.route('/:topicId/questions/:questionId').put(questionController.updateQuestionsForATopic);
router.route('/:topicId/questions/:questionId').delete(questionController.deleteQuestionsForATopic);



module.exports = router
 