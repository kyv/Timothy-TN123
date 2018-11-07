const Sequelize = require('sequelize');

const storage = (process.env.NODE_ENV === 'test') ? './test.db.sqlite' : 'db.sqlite';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  logging: false,
  // SQLite only
  storage,
});

sequelize
  .authenticate()
  .then(() => {
    // console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
