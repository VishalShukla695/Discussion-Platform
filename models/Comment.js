const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Discussion = require('./Discussion');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  discussion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Discussion,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  text: {
    type: DataTypes.TEXT
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Comment;
