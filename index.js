const express = require('express');
const app = express();

const index = require('./routes/index.js');
const book = require('./routes/book.js');

app.get('/', index);
app.get('/book', book);

app.listen(3000, () => process.stdout.write('Open http://localhost:3000 to see a response.'));

module.exports = app;
