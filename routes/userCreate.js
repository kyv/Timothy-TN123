const User = require('../models/user');
const nresolve = require('../lib/dns');

module.exports = (req, res) => {

  const data = Object.assign({}, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  const tld = data.email.split(/@/);

  nresolve(tld[1]).then(() => {
    User.create(data).then(result => {

      // associate with appropriate Institution
      result.setInstitution(tld[1]);

      res.json({
        status: 'success',
        data: {
          email: result.email,
          id: result.id,
          role: result.role,
          username: result.username,
          updatedAt: result.updatedAt,
          createdAt: result.createdAt,
        },
      });
    });
  }).catch(() => {
    // send an error if nresolve fails
    res.json({
      status: 'fail',
      data: {
        title: 'An email with a valid domain is required',
      },
    });
  });
};
