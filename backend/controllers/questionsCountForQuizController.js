const QuestionsCountForQuiz = require('../models/QuestionsCountForQuiz');

exports.getQuestionCounts = async (req, res) => {
    try {
        const counts = await QuestionsCountForQuiz.findAll();
        res.json(counts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createQuestionCount = async (req, res) => {
    try {
        const questionCount = await QuestionsCountForQuiz.create({
            count: req.body.count
        });
        res.status(201).json(questionCount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
