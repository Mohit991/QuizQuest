const sequelize = require('../config/database');
const Category = require('./Category');
const Question = require('./Question');
const Topic = require('./Topic');
const User = require('./User');

const db = {
    sequelize,
    Category,
    Topic,
    Question,
    User
};

module.exports = db;
