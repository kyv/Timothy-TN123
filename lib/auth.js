const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
  ((username, password, done) => {
    User.findOne({ where: { username } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        if (user.password.toString() !== password.toString()) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => {
        done(err);
      });
  })
));

module.exports = passport;
