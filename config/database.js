const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('discussion_platform', 'root', 'Vishal@0522', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
