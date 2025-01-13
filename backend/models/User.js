const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/i, // Allows letters and spaces
        len: [2, 50], // Ensures name is between 2 and 50 characters
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true, // Make age optional
      validate: {
        min: 1,
        max: 80,
      },
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true, // Make gender optional
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Instance method to check password validity
User.prototype.checkPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
