const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')

router.route('/').get(topicController.getAllTopicsForCategory);
router.route('/:categoryId/topics').get(topicController.getTopicsForCategory);
router.route('/:categoryId/topics').post(topicController.addTopicsForCategory);
router.route('/:categoryId/topics/:topicId').put(topicController.updateTopicsForCategory);
router.route('/:categoryId/topics/:topicId').delete(topicController.deleteTopicsForCategory);

module.exports = router
