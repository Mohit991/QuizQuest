const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Topic = require('./Topic'); // Import the Topic model to reference it
// const Level = require('./Level'); // Import the Level model to reference it

const Question = sequelize.define('Question', {
    question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Topic,       // References the Topic model
            key: 'topic_id'     // The foreign key column in Topic
        }
    },
    // To be added later
    // level_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Level,       // References the Level model
    //         key: 'id'           // The foreign key column in Level
    //     }
    // },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correct_option: {
        type: DataTypes.INTEGER, // 1, 2, 3, or 4
        allowNull: false
    },
    explanation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Easy', 'Medium', 'Hard']] // Only allow these values
        }
    }
}, {
    tableName: 'questions',
    timestamps: false,
});

// Set up the relationship with the Topic model
Topic.hasMany(Question, { foreignKey: 'topic_id' });
Question.belongsTo(Topic, { foreignKey: 'topic_id' });

// To be added later
// Set up the relationship with the Level model
// Level.hasMany(Question, { foreignKey: 'level_id' });
// Question.belongsTo(Level, { foreignKey: 'level_id' });

module.exports = Question;
