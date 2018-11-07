module.exports = (req, res, next) => {
  const { id, username } = req.user;

  res.json({
    status: 'success',
    data: {
      id,
      username,
    },
  });
};
