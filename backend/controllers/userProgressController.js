const UserProgress = require('../models/UserProgress');

const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await UserProgress.findAll({ where: { user_id: userId } });
    if (progress.length === 0) {
      return res.status(404).json({ message: 'No progress found for this user.' });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const addUserProgress = async (req, res) => {
  try {
    const { user_id, topic_id, score, total_questions, correct_answers, quiz_date, percentage } = req.body;
    const newProgress = await UserProgress.create({
      user_id,
      topic_id,
      score,
      total_questions,
      correct_answers,
      quiz_date,
      percentage
    });
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getUserProgress,
  addUserProgress,
};