const mailer = require('../utils/mailer');

module.exports = (io, socket) => {
  // socket listeners

  // listen for 'new user' socket emits from the client
  socket.on('new user', (username) => {
    console.log(`${username} has joined GroupDraft 👋`);

    // send the username to all clients currently connected
    // uses io.emit
    io.emit('new user', username);
  });

  socket.on('text change', (text) => {
    io.emit('text change', text);
  });

  socket.on('send email', (user, text) => {
    mailer.sendMail(user, text);
    io.emit('send email');
  });
};
