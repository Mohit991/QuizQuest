const Topic = require('../models/Topic');
const asyncHandler = require('express-async-handler');

// @route   GET /api/categories/:categoryId/topics
// @desc    Get all topics for a specific category
// @access  Private

const getAllTopicsForCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    if (isNaN(categoryId)) {
        return res.status(400).json({ message: 'Invalid category ID' });
    }
    
    // Fetch topics for the given categoryId
    const topics = await Topic.findAll({ where: { category_id: categoryId } });

    if (!topics || topics.length === 0) {
        return res.status(404).json({ message: 'No topics found in this category' });
    }
    res.status(200).json(topics);
});

module.exports = {
    getAllTopicsForCategory,
};
