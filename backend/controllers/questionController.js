const Question = require('../models/Question');
const asyncHandler = require('express-async-handler');

// @route   GET /api/topics/:topicId/questions
// @desc    Get all questions for a specific topic
// @access  Private

const getAllQuestionsForATopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;

    if (isNaN(topicId)) {
        return res.status(400).json({ message: 'Invalid topic ID' });
    }
    
    // Fetch questions for the given topicId
    const questions = await Question.findAll({ where: { topic_id: topicId } });

    if (!questions || questions.length === 0) {
        return res.status(404).json({ message: 'No questions found in this category' });
    }
    res.status(200).json(questions);
});

module.exports = {
    getAllQuestionsForATopic,
};
