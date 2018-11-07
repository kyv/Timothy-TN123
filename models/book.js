const Sequelize = require('sequelize');
const db = require('../lib/db.js');

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Book;
