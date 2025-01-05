const UserProgress = require('../models/UserProgress');
const Topic = require('../models/Topic');
const Category = require('../models/Category');

const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await UserProgress.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Topic,
          attributes: ['topic_name'],
          include: {
            model: Category,
            attributes: ['category_name']
          }
        }
      ]
    });
    if (progress.length === 0) {
      return res.status(404).json({ message: 'No progress found for this user.' });
    }
    const formattedProgress = progress.map(p => ({
      topic_name: p.Topic.topic_name, // Corrected attribute name
      category_name: p.Topic.Category.category_name, // Corrected attribute name
      quiz_date: p.quiz_date,
      total_questions: p.total_questions,
      correct_answers: p.correct_answers,
      score: p.score,
      percentage: p.percentage
    }));
    res.status(200).json(formattedProgress);
  } catch (error) {
    console.error('Error fetching user progress:', error); // Add this line
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