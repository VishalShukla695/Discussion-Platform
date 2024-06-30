const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Discussion = require('./Discussion');
const Hashtag = require('./Hashtag');

const DiscussionHashtag = sequelize.define('DiscussionHashtag', {
  discussion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Discussion,
      key: 'id'
    }
  },
  hashtag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Hashtag,
      key: 'id'
    }
  }
});

module.exports = DiscussionHashtag;
