const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QuestionsCountForQuiz = sequelize.define('Questions_Count_For_Quiz', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    tableName: 'Questions_Count_For_Quiz',
    timestamps: false
});

module.exports = QuestionsCountForQuiz;
