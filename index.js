const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index.js');
const book = require('./routes/book.js');
const signin = require('./routes/signin.js');
const passport = require('./lib/auth');

app.use(bodyParser.json()); // for parsing application/json
app.use(passport.initialize());

app.get('/', index);
app.get('/book', book);
app.post('/signin',
  passport.authenticate('local',
    {
      // failureRedirect: '/signin',
      session: false,
    }),
  signin);


app.listen(3000, () => process.stdout.write('Open http://localhost:3000 to see a response.'));

module.exports = app;
