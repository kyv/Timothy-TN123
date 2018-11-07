const User = require('../models/user');
const nresolve = require('../lib/dns');

module.exports = (req, res, next) => {

  const data = Object.assign({}, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const tld = data.email.split(/@/);

  nresolve(tld[1]).then(() => {
    User.create(data).then(result => {
      const {
        email,
        id,
        username,
        updatedAt,
        createdAt,
      } = result;

      res.json({
        status: 'success',
        data: {
          email,
          id,
          username,
          updatedAt,
          createdAt,
        },
      });
    });
  });
};
