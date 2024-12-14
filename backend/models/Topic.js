const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category'); 

const Topic = sequelize.define(
    'Topic',
    {
        topic_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        topic_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category, // Reference the Category table
                key: 'category_id',
            },
            onDelete: 'CASCADE', // Optional: Define behavior on delete
            onUpdate: 'CASCADE', // Optional: Define behavior on update
        },
    },
    {
        tableName: 'topics',
        timestamps: false,
    }
);

// Defining the association
Category.hasMany(Topic, { foreignKey: 'category_id' });
Topic.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Topic;
