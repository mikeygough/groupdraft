// could also be called index.js
$(document).ready(() => {
  // connect to the socket.io server
  const socket = io.connect();

  // socket emitter
  // uses socket.emit
  $('#create-user-btn').click((e) => {
    e.preventDefault();
    let username = $('#username-input').val();
    if (username.length > 0) {
      // emit to the server (from the client) the new user
      socket.emit('new user', username);
      $('.username-form').remove();
    }
  });

  // socket listener
  // uses socket.on
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the GroupDraft! ✋`);
  });
});
