/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into vote,
 *   these routes are mounted onto /vote
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { sendEmail } = require('../lib/sendgrid.js');
/* GET /vote */
//In vote.ejs file we display a question with options, where the user
// could drag and drop the options based on the preferences.

router.get('/', (req, res) => {
  res.render('vote');
});


//In this post route we make a DB call to insert into results table.
//Once insertion is successful, we call the sendEmail function.
//this email will contain a link for results.

router.post('/', (req, res) => {
  sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','This is your vote results here');

  res.render('vote');
});


module.exports = router;
