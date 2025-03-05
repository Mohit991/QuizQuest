const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.route('/').get(categoryController.getAllCategories)
router.route('/').post(categoryController.addCategories);
router.route('/:id').put(categoryController.updateCategories);
router.route('/:id').delete(categoryController.deleteCategories);

module.exports = router



