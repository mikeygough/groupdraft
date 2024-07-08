const mailer = require('../utils/mailer');

module.exports = (io, socket, onlineUsers, groupDraft) => {
  // socket listeners

  // listen for 'new user' socket emits from the client
  socket.on('new user', (username) => {
    // save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;

    console.log(onlineUsers);

    // save the username to socket as well.
    socket['username'] = username;

    // send the username to all clients currently connected
    // uses io.emit
    io.emit('new user', username);
  });

  socket.on('get online users', () => {
    // send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  });

  socket.on('get groupdraft', () => {
    // send over the text
    socket.emit('get groupdraft', groupDraft['text']);
  });

  socket.on('disconnect', () => {
    // delete the user by using the username we saved to the socket
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });

  socket.on('text change', (text) => {
    groupDraft['text'] = text;
    io.emit('text change', text);
  });

  socket.on('send email', (user, text) => {
    mailer.sendMail(user, text);
    io.emit('send email');
  });
};
