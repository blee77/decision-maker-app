
//Add Mailgun as a seperate file like we did for DB connections
const Mailgun = require('mailgun-js');
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = 'YOUR_MAILGUN_DOMAIN';
const mailgun = new Mailgun({apiKey: API_KEY, domain: DOMAIN});


module.exports = mailgun;
