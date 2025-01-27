// const Topic = require('../models/Topic');
const Topic = require('../models/Topic'); 
const Question = require('../models/Question');
const topic = require('../models/Topic')
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

    if (noOfQuestions === '0') {
        return res.status(400).json({ message: 'Number of questions cannot be 0' });
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

// @desc Get add QuestionsForATopic
// @route POST /api/topics/:topicId/questions
// @access Private
const addQuestionsForATopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid questions array' });
    }

    try {
        const questionPromises = questions.map((question) => {

            return Question.create({
                topic_id: topicId,
                question_text: question.question_text,
                option1: question.option1,
                option2: question.option2,
                option3: question.option3,
                option4: question.option4,
                correct_option: question.correct_option,
                explanation: question.explanation || null, // Explanation is optional
                difficulty: question.difficulty,
            });
        });

        // Wait for all promises to resolve (all questions to be created)
        await Promise.all(questionPromises);

        res.status(201).json({ message: 'Questions added successfully' });
    } catch (error) {
        console.error('Error adding questions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// @desc Update a question controller
// @route PUT /api/topics/:topicID/questions/:questionsID
// @access Private
const updateQuestionsForATopic = asyncHandler(async (req, res) => {
    const { topicId, questionId } = req.params; 
    const { question_text, option1, option2, option3, option4, correct_option, explanation, difficulty } = req.body;  // Extract the data to update

    try {
        if (!question_text || !option1 || !option2 || !option3 || !option4 || !correct_option) {
            return res.status(400).json({ message: 'All options and question text are required' });
        }

        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Find the question and ensure it belongs to the specified topic
        const question = await Question.findOne({
            where: {
                question_id: questionId,
                topic_id: topicId,
            },
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Update the question
        question.question_text = question_text || question.question_text;
        question.option1 = option1 || question.option1;
        question.option2 = option2 || question.option2;
        question.option3 = option3 || question.option3;
        question.option4 = option4 || question.option4;
        question.correct_option = correct_option || question.correct_option;
        question.explanation = explanation || question.explanation;
        question.difficulty = difficulty || question.difficulty;

        // Save the updated question
        await question.save();

        res.status(200).json({
            message: 'Question updated successfully',
            question: question,
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'An error occurred while updating the question', error: error.message });
    }
});

// @desc Delete a question for a specific topic
// @route DELETE /api/topic/:topicId/questions/:questionId
// @access Private
const deleteQuestionsForATopic = asyncHandler(async (req, res) => {
    const { topicId, questionId } = req.params;

    try {
        // Find the topic by its ID
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Find the question by its ID and ensure it belongs to the specified topic
        const question = await Question.findOne({
            where: {
                question_id: questionId,
                topic_id: topicId,
            },
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Delete the question from the db
        await question.destroy();

        // Return success response
        res.status(200).json({ message: 'Question deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = deleteQuestionsForATopic;


module.exports = {
    getAllQuestionsForATopic,
    addQuestionsForATopic,
    updateQuestionsForATopic,
    deleteQuestionsForATopic
};
