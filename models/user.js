const Sequelize = require('sequelize');
const Institution = require('./institution');
const db = require('../lib/db.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  role: {
    // eslint-disable-next-line new-cap
    type: Sequelize.ENUM(
      'student',
      'academic',
      'administrator'
    ),
    allowNull: false,

  },
});

User.belongsTo(Institution);

module.exports = User;
