const Question = require('../models/Question');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');

// @route   GET /api/topics/:topicId/questions
// @desc    Get random filtered questions for a specific topic and difficulty
// @access  Private

const getAllQuestionsForATopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { noOfQuestions, level } = req.query;

    if (isNaN(topicId)) {
        return res.status(400).json({ message: 'Invalid topic ID' });
    }

    const questionLimit = parseInt(noOfQuestions, 10) || 10; // Default to 10 questions if not specified

    try {
        // Fetch random questions for the specified difficulty
        const questions = await Question.findAll({
            where: {
                topic_id: topicId,
                difficulty: level,
            },
            order: Sequelize.literal('RAND()'), // Randomize results
            limit: questionLimit,
        });

        // If fewer than requested questions are available, fetch the max available randomly
        if (!questions || questions.length < questionLimit) {
            const maxAvailableQuestions = await Question.findAll({
                where: { topic_id: topicId },
                order: Sequelize.literal('RAND()'), // Randomize results
                limit: questionLimit,
            });
            return res.status(200).json(maxAvailableQuestions);
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = {
    getAllQuestionsForATopic,
};
