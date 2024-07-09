// env
require('dotenv').config();

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

// export send mail function
module.exports.sendMail = (text) => {
  nodemailerMailgun
    .sendMail({
      from: 'no-reply@example.com',
      to: process.env.EMAIL, // ensure this email is authorized in mailgun
      subject: 'Your GroupDraft is Ready!',
      template: {
        name: 'email.handlebars',
        engine: 'handlebars',
        context: {
          text: text,
        },
      },
    })
    .then((info) => {
      console.log('Response: ' + info);
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
};
