const sequelize = require('../config/database');
const Category = require('./Category');
const Question = require('./Question');
const Topic = require('./Topic');
const User = require('./User');
const Level = require('./Level');
const UserProgress = require('./UserProgress');
const QuestionsCountForQuiz = require('./QuestionsCountForQuiz');

const db = {
    sequelize,
    Category,
    Topic,
    Question,
    User,
    UserProgress,
    Level,
    QuestionsCountForQuiz
};

module.exports = db;
