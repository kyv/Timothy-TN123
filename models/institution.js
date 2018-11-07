const Sequelize = require('sequelize');
const db = require('../lib/db.js');

const Institution = db.define('institution', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    allowNull: false,
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Institution;
