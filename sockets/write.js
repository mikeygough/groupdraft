module.exports = (io, socket) => {
  // socket listeners

  // listen for 'new user' socket emits from the client
  socket.on('new user', (username) => {
    console.log(`${username} has joined GroupDraft 👋`);

    // send the username to all clients currently connected
    // uses io.emit
    io.emit('new user', username);
  });
};
