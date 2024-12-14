const sequelize = require('../config/database');
const Category = require('./Category');
const Topic = require('./Topic');

const db = {
    sequelize,
    Category,
    Topic
};

module.exports = db;
