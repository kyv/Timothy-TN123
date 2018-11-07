const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const { id, username, createdAt, institutionDomain } = req.user;
  const payload = {
    id, username, createdAt, institutionDomain,
  };
  const token = jwt.encode(payload, secret);

  res.json({
    status: 'success',
    data: {
      id,
      username,
      token,
    },
  });
};
