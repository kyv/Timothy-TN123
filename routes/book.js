module.exports = (req, res, next) => {
  res.json({
    status: 'success',
    data: {
      book: { id: 1, title: 'A blog post', body: 'Some useful content' },
    },
  });
};
