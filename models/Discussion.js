const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Discussion = sequelize.define('Discussion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  text: {
    type: DataTypes.TEXT
  },
  image_url: {
    type: DataTypes.STRING
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Discussion;
