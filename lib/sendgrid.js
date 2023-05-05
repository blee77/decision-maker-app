
// //Add Mailgun as a seperate file like we did for DB connections
// const Mailgun = require('mailgun-js');
// const API_KEY = process.env.MAILGUN_API_KEY;
// const DOMAIN = 'YOUR_MAILGUN_DOMAIN';
// const mailgun = new Mailgun({apiKey: API_KEY, domain: DOMAIN});


// module.exports = mailgun;



//Add Sendgrid as a seperate file like we did for DB connections
// const sgMail = require('@sendgrid/mail');

// const API_KEY = process.env.SENDGRID_API_KEY;

// sgMail.setApiKey(API_KEY);

// const message = {
//   to: 'brucehlee@yahoo.ca',
//   from: 'decisionmakerapp123@gmail.com',
//   subject: 'Hello from Decision Maker App',
//   text: 'Hello'
// };

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

console.log(process.env.SENDGRID_API_KEY);
// Temp-mail.org
//form->name+email(DB)->
const msg = {
  to: 'brucehlee@yahoo.ca',
  from: 'decisionmakerapp123@gmail.com',
  subject: 'Hello from Decision Maker App',
  text: 'Hello'
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  });
//ES8
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
})();
