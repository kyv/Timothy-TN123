const Sequelize = require('sequelize');
const db = require('../lib/db.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
