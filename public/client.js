// could also be called index.js
$(document).ready(() => {
  // connect to the socket.io server
  const socket = io.connect();

  // consts
  const groupdraftContainer = $('#groupdraft-textarea-container');
  const sendEmailContainer = $('#send-email-btn-container');
  const groupdraft = $('#groupdraft-textarea');

  // socket emitter - groupdraft-textarea
  groupdraft.on('keyup', function () {
    const text = $(this).val();
    socket.emit('text change', text);
  });

  // socketet listener - groupdraft-textarea
  socket.on('text change', (text) => {
    groupdraft.val(text);
  });

  // socket emitter - create-user-btn
  // uses socket.emit
  $('#create-user-btn').click((e) => {
    e.preventDefault();
    let username = $('#username-input').val();
    if (username.length > 0) {
      // emit to the server (from the client) the new user
      socket.emit('new user', username);
      $('.username-form').remove();

      // show groupdraft
      groupdraftContainer.show();
      groupdraftContainer.css('display', 'flex');

      // show email-btn
      sendEmailContainer.show();
      sendEmailContainer.css('display', 'flex');
    }
  });

  // socket listener - create-user-btn
  // uses socket.on
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the GroupDraft! ✋`);
  });

  // socket listener - send-email-btn
  // socket emitter
  $('#send-email-btn').click((e) => {
    const text = groupdraft.val();
    socket.emit('send email', text);
  });
});
