// express
const express = require('express');
const app = express();

// server
const server = require('http').Server(app);

// handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use('/static', express.static('static'));

// app
app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
