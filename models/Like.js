const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Discussion = require('./Discussion');
const Comment = require('./Comment');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  discussion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Discussion,
      key: 'id'
    }
  },
  comment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Comment,
      key: 'id'
    }
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Like;
