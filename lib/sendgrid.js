
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
