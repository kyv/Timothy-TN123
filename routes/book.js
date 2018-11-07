const Book = require('../models/book');

module.exports = (req, res, next) => {
  const institutionDomain = req.user.institutionDomain;

  Book.findAll({ where: { institutionDomain } }).then(books => {
    res.json({
      status: 'success',
      data: books,
    });
  });
};
