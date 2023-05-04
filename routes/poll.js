/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const pool = require('../db/connection.js');
const { getPollsByID } = require('../db/queries/poll.js');

const { sendEmail } = require('../lib/sendgrid.js');

/* GET /poll/:id */
router.get('/:id', (req, res) => {
  //Inside the create poll.ejs write a simple div to show the results of the get request
  // console.log('route:poll/id');
  getPollsByID(req.params.id)
  .then((result) => {
    let poll_object = result[0];
    // console.log(poll_object);
    res.render('poll', poll_object);
  })
  .catch((reject) => {
    res.render('pageNotFound');
  });
});


/* GET /poll/createpoll */
router.get('/createpoll', (req, res) => {
  //Inside the create poll.ejs write a simple form where the user could enter a question and options
  res.render('createpoll');
});

/* POST /poll/createpoll */
router.post('/createpoll', (req, res) => {
  //Insert into polls table
  //Once insertion into poll table is successful , call the send email function.
  console.log('pollData:', req.body);

  sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you? Please click on the link to access the poll : www.example.com');

  res.render('createpoll');
});


/* GET /poll/choices */
router.get('/createchoices/:id', (req, res) => {
  //Inside the create poll.ejs write a simple form where the user could enter a question and options
  res.render('createchoices');
});

/* POST /poll/choices */
router.post('/createpoll', (req, res) => {
  //Insert into polls table
  //Once insertion into poll table is successful , call the send email function.
  console.log('pollData:', req.body);

  sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you? Please click on the link to access the poll : www.example.com');

  res.render('createpoll');
});



// Route to add poll results to the database
router.post('/results', async (req, res) => {
  try {
    const results = req.body.results; // assuming the request body contains the poll results in JSON format
    const user = req.body.user; // assuming the request body also contains the user who submitted the results
    await pool.query('INSERT INTO poll_results (results, user) VALUES ($1, $2)', [results, user]);
    sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you? Please click on the link to access the poll : www.example.com');
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router;


