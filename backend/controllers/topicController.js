// const Topic = require('../models/Topic');
const asyncHandler = require('express-async-handler');
const { Topic, Category } = require('../models'); 

// @route   GET /api/topic/
// @desc    Get all topics for a specific category
// @access  Private
const getAllTopicsForCategory = asyncHandler(async (req, res) => {
    const topics = await Topic.findAll();
    
    if (!topics || topics.length === 0) {
        return res.status(404).json({ message: 'No topics found' });
    }
    res.status(200).json(topics);
});

// @route   GET /api/topic/:categoryId/topics
// @desc    Get topics for a specific categoryId
// @access  Private
const getTopicsForCategory = asyncHandler(async (req, res) => {
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


// @route   POST /api/topic/:categoryId/topics
// @desc    Add topics for a specific category
// @access  Private
const addTopicsForCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { topic_name } = req.body;  
    
    if (!topic_name) {
        return res.status(400).json({ message: 'Topic name is required' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    // Create the new topic in the database
    const newTopic = await Topic.create({
        topic_name,
        category_id: categoryId,
    });

    res.status(201).json(newTopic);
});

// @route   PUT /api/tipic/categoryId/topics/:topicId
// @desc    Update a topic for a specific category
// @access  Private
const updateTopicsForCategory = asyncHandler(async (req, res) => {
    const { categoryId, topicId } = req.params; 
    const { topic_name } = req.body; 

    if (!topic_name) {
        return res.status(400).json({ message: 'Topic name is required' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the topic exists in the given category
    const topic = await Topic.findOne({ where: { topic_id: topicId, category_id: categoryId } });
    if (!topic) {
        return res.status(404).json({ message: 'Topic not found in this category' });
    }

    // Update the topic
    topic.topic_name = topic_name;
    await topic.save();

    // Respond with the updated topic
    res.status(200).json(topic);
});

// @route   DELETE /api/topic/:categoryId/topics/:topicId
// @desc    Delete a topic for a specific category
// @access  Private
const deleteTopicsForCategory = asyncHandler(async (req, res) => {
    const { categoryId, topicId } = req.params; 

     // Check if the category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    // Find the topic by topicId and ensure it belongs to the given category
    const topic = await Topic.findOne({ where: { topic_id: topicId, category_id: categoryId } });
    if (!topic) {
        return res.status(404).json({ message: 'Topic not found in this category' });
    }

    // Delete the topic
    await topic.destroy();

    res.status(200).json({ message: 'Topic deleted successfully' });
});



module.exports = {
    getTopicsForCategory,
    getAllTopicsForCategory,
    addTopicsForCategory,
    updateTopicsForCategory,
    deleteTopicsForCategory
};
