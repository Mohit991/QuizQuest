const sequelize = require('../config/database');
const Category = require('./Category');

const db = {
    sequelize,
    Category
};

module.exports = db;
