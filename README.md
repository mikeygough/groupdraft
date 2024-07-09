#### overview

GroupDraft is a lightweight, collaborative writing tool built with the power of SocketIO. this app leverages web sockets to enable real-time collaboration on an html text area element. when a draft is complete, users can then email a copy to themselves.

user stories:

- upon entering the application, i can choose a username to go by.

- after choosing a username, i can start typing in the text area. anything i type is viewable and editable by all other users currently on the application.

- when my draft is ready, i can email a copy of what the group has written by clicking 'email'.

#### install

you can install and run the app by cloning this repository:

`git clone https://github.com/mikeygough/groupdraft.git`

install dependencies:

`npm install`

run the server:

`nodemon app.js`

...to unlock the full potential of the app you'll need some environment variables:

create a .env file:

`code .env`

you'll need the following values in .env:

- MAILGUN_API_KEY
- MAILGUN_DOMAIN
- EMAIL

[mailgun](https://www.mailgun.com/) is the email service used to send mail. once you've created a mailgun account, generate an API key to use with their sandbox mailgun domain.

update your `.env` to include your api key, the sandbox mailgun domain and the email address you'd like copies of your groupdraft to be sent to. please note, you must authorize this email address to receive mailgun emails. this is done from the mailgun site. simply click on the sandbox domain and add an authorized recipient.

#### demo

https://github.com/mikeygough/groupdraft/assets/26821806/29fbf759-000f-4cf6-b5ae-5666389461dd

made with 🖤 by mikey gough

2024
