const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Topic = require('./Topic');

const UserProgress = sequelize.define('UserProgress', {
  progress_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Topic,
      key: 'topic_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correct_answers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quiz_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'user_progress',
  timestamps: false,
});

// Set up the relationships
User.hasMany(UserProgress, { foreignKey: 'user_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });

Topic.hasMany(UserProgress, { foreignKey: 'topic_id' });
UserProgress.belongsTo(Topic, { foreignKey: 'topic_id' });

module.exports = UserProgress;
