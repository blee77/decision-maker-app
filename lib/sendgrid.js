// //Add Mailgun as a seperate file like we did for DB connections
// const Mailgun = require('mailgun-js');
// // const API_KEY = process.env.MAILGUN_API_KEY;
// const DOMAIN = 'YOUR_MAILGUN_DOMAIN';
// const mailgun = new Mailgun({apiKey: API_KEY, domain: DOMAIN});

// module.exports = mailgun;

// // Add Sendgrid as a seperate file like we did for DB connections
// const sgMail = require('@sendgrid/mail');

// const API_KEY = process.env.SENDGRID_API_KEY;

// sgMail.setApiKey(API_KEY);

// const message = {
//   to: 'brucehlee@yahoo.ca',
//   from: 'decisionmakerapp123@gmail.com',
//   subject: 'Hello from Decision Maker App',
//   text: 'Hello'
// };
// require('dotenv').config({path:__dirname + '/../.env'});
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// console.log(process.env.SENDGRID_API_KEY);

// let emails = ['brucehlee@yahoo.ca'];

// for (let email of emails) {

// // const sendEmail = function(email) {

//   const msg = {
//     from: 'brucehl@hotmail.com',

//     to: email,

//     subject: 'Hello from Decision Maker App',
//     text: 'We are excited to inform you that our app now allows you to create polls with multiple choices! Here are the instructions: Start by creating your poll: Enter the question you want to ask and provide multiple choices. Each choice can have a title and optional description.Enter your email: You must enter an email address to create the poll. Access your administrative and submission links: Once you have finished creating your poll, you will be provided with two links. The administrative link will let you access the results, while the submission link can be sent to your friends. Share your poll: Send the submission link to your friends and ask them to vote. Note that there is no need for your voters to register or log in. They will only be required to enter their name (if necessary) and rank the choices. Check your email for notifications: Each time a submission is received, you will receive an email notification that includes the administrative link and a link to the results. Check the results: The results will be ranked using the Borda Count method.Please note that the app does not follow the typical user authentication process. Voters do not need to register or log in, and the only way to access the polls or see the results is via links.We hope you find our app useful. If you have any questions or need further assistance, please do not hesitate to contact us.'
//   };

//   //ES6
//   sgMail
//     .send(msg)
//     .then(() => {}, error => {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     });
//   //ES8
//   (async() => {
//     try {
//       await sgMail.send(msg);
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   })();

// };



// ----------------------------

require("dotenv").config({ path: __dirname + "/../.env" });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = function (to, subject, text) {
  // return new Promise((resolve, reject) => {
  const msg = {
    to,
    from: "brucehl@hotmail.com",
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then((res) => {
      console.log(`Email sent to ${to}`);
      console.log(res);
      // resolve();
    })
    .catch((err) => {
      console.error(err);
      // reject(err);
    });
  // });
};
// sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you?');
module.exports = { sendEmail };
