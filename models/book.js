const Sequelize = require('sequelize');
const Institution = require('./institution');
const db = require('../lib/db.js');

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ISBN: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Book.belongsTo(Institution);

module.exports = Book;
