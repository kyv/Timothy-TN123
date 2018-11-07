const User = require('../models/user');
const nresolve = require('../lib/dns');

module.exports = (req, res, next) => {

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
      const {
        email,
        id,
        role,
        username,
        updatedAt,
        createdAt,
      } = result;

      res.json({
        status: 'success',
        data: {
          email,
          id,
          role,
          username,
          updatedAt,
          createdAt,
        },
      });
    });
  }).catch(err => {
    // catch the nresolve error
    console.error(err);
  });
};
