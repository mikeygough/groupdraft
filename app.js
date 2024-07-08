// env
require('dotenv').config();

// express
const express = require('express');
const app = express();

// server
const server = require('http').Server(app);

// socket.io
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('new user connected!');
  require('./sockets/write.js')(io, socket);
});

// handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// mailgun
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// mailgun auth
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

// create mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// SEND EMAIL
const user = {
  email: 'mikey@hey.com',
  name: 'mikey',
  age: '18',
};

nodemailerMailgun
  .sendMail({
    from: 'no-reply@example.com',
    to: user.email, // An array if you have multiple recipients.
    subject: 'Hey you, awesome!',
    template: {
      name: 'email.handlebars',
      engine: 'handlebars',
      context: user,
    },
  })
  .then((info) => {
    console.log('Response: ' + info);
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// app
app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
