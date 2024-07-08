// could also be called index.js
$(document).ready(() => {
  // connect to the socket.io server
  const socket = io.connect();

  // consts
  const groupdraftContainer = $('#groupdraft-textarea-container');
  const sendEmailContainer = $('#send-email-btn-container');
  const groupdraft = $('#groupdraft-textarea');
  const onlineUsersContainer = $('#online-users-container');

  // track of the current user
  // let currentUser;

  // socket emitter
  // - get online users
  socket.emit('get online users');

  // socket listener
  // - update online-users-ul UI
  socket.on('get online users', (onlineUsers) => {
    for (username in onlineUsers) {
      $('#online-users-ul').append(`<li>${username}</li>`);
    }
  });

  // socket emitter
  // - groupdraft-textarea change
  groupdraft.on('keyup', function () {
    const text = $(this).val();
    socket.emit('text change', text);
  });

  // socketet listener
  // - update groupdraft-textarea UI
  socket.on('text change', (text) => {
    groupdraft.val(text);
  });

  // socket emitter
  // - create-user-btn click
  $('#create-user-btn').click((e) => {
    e.preventDefault();
    let username = $('#username-input').val();
    if (username.length > 0) {
      // emit to the server (from the client) the new user
      socket.emit('new user', username);

      // save the current user when created
      // currentUser = $('#username-input').val();

      // remove form
      $('.username-form').remove();

      // show groupdraft
      groupdraftContainer.show();
      groupdraftContainer.css('display', 'flex');

      // show email-btn
      sendEmailContainer.show();
      sendEmailContainer.css('display', 'flex');

      // show online users
      onlineUsersContainer.show();
    }
  });

  // socket listener
  // - update online-users UI
  socket.on('new user', (username) => {
    $('#online-users-ul').append(`<li>${username}</li>`);
  });

  // socket emitter
  // - send-email-btn click
  $('#send-email-btn').click((e) => {
    const text = groupdraft.val();
    socket.emit('send email', text);

    Toastify({
      text: 'Email Sent! 💌',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    }).showToast();
  });

  // socket listener
  // - update online-users UI
  socket.on('user has left', (onlineUsers) => {
    $('#online-users-ul').empty();
    for (username in onlineUsers) {
      $('#online-users-ul').append(`<li>${username}</li>`);
    }
  });
});
