const sequelize = require('../config/database');
const Category = require('./Category');
const Question = require('./Question');
const Topic = require('./Topic');

const db = {
    sequelize,
    Category,
    Topic,
    Question
};

module.exports = db;
