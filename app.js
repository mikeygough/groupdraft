// env
require('dotenv').config();

// express
const express = require('express');
const app = express();

// server
const server = require('http').Server(app);

// socket.io
const io = require('socket.io')(server);

// initial state
let onlineUsers = {};
let groupDraft = { text: '' };

io.on('connection', (socket) => {
  console.log('new user connected!');
  require('./sockets/write.js')(io, socket, onlineUsers, groupDraft);
});

// handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// app
app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
