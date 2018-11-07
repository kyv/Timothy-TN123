const Book = require('../models/book');

module.exports = (req, res, next) => {
  Book.findAll().then(books => {
    res.json({
      status: 'success',
      data: books,
    });
  });
};
