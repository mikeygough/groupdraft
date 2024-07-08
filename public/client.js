// could also be called index.js
$(document).ready(() => {
  // connect to the socket.io server
  const socket = io.connect();

  // groupdraft text area
  // socket emitter
  const groupdraft = $('#groupdraft-textarea');
  groupdraft.on('keyup', function () {
    const text = $(this).val();
    socket.emit('text change', text);
  });

  // socketet listener
  socket.on('text change', (text) => {
    groupdraft.val(text);
  });

  // socket emitter
  // uses socket.emit
  $('#create-user-btn').click((e) => {
    e.preventDefault();
    let username = $('#username-input').val();
    if (username.length > 0) {
      // emit to the server (from the client) the new user
      socket.emit('new user', username);
      $('.username-form').remove();
      groupdraft.show();
      groupdraft.css('display', 'flex');
    }
  });

  // socket listener
  // uses socket.on
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the GroupDraft! ✋`);
  });

  // send-email-btn
  // socket emitter
  $('#send-email-btn').click((e) => {
    const text = groupdraft.val();
    socket.emit('send email', text);
  });
});
