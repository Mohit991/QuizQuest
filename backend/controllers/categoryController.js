const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')

// @desc Get all categories 
// @route GET /api/quiz/category
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const categories = await Category.findAll()

    // If no notes 
    if (!categories?.length) {
        return res.status(400).json({ message: 'No categories found' })
    }

    res.json(categories)
})

module.exports = {
    getAllCategories
}
