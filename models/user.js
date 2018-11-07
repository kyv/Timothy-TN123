const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Institution = require('./institution');
const db = require('../lib/db.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  role: {
    // eslint-disable-next-line new-cap
    type: Sequelize.ENUM(
      'student',
      'academic',
      'administrator'
    ),
    allowNull: false,
  },
});

User.belongsTo(Institution);

// replace the password w/ its hash before save
User.beforeCreate(user => {
  const hash = bcrypt.hashSync(user.password.toString(), 10);

  user.password = hash;
});

// verify password resloves to correct hash
User.prototype.verifyPassword = function(password) {
  // return (password.toString() === this.password.toString())
  return bcrypt.compareSync(password.toString(), this.password);

};

module.exports = User;
