const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const app = express();

const index = require('./routes/index.js');
const book = require('./routes/book.js');
const signin = require('./routes/signin.js');
const createUser = require('./routes/userCreate.js');
const passport = require('./lib/auth');

const secret = process.env.JWT_SECRET;

app.use(bodyParser.json()); // for parsing application/json
app.use(passport.initialize());

app.get('/', index);
app.get('/book', jwt({ secret }), book);
app.post('/users/signin',
  passport.authenticate('local',
    {
      // failureRedirect: '/signin',
      session: false,
    }),
  signin);
app.post('/users/create', createUser);


app.listen(3000, () => process.stdout.write('Open http://localhost:3000 to see a response.\n'));

module.exports = app;
