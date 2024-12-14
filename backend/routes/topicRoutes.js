const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')

router.route('/:categoryId/topics')
    .get(topicController.getAllTopicsForCategory)

module.exports = router