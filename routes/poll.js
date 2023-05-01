/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const pool = require('../db/connection.js');

const { sendEmail } = require('../lib/sendgrid.js');


/* GET /poll/createpoll */
router.get('/createpoll', (req, res) => {
  res.render('createpoll');
});



// Route to retrieve poll results and the corresponding users
router.get('/results/:id', async(req, res) => {
  try {

    //What is the data structure? Gives you idea how to write the query what tables will beed to be joined, 2) what do you need to select tables to?
    const result = await pool.query(`SELECT * FROM results

    JOIN choices ON choices.choice_id = results.choice_id
    JOIN polls ON polls.poll_id = choices.poll_id

    WHERE choices.poll_id = $1`,
    [req.params.id]

    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



// Route to add poll results to the database
router.post('/results', async (req, res) => {
  try {
    const results = req.body.results; // assuming the request body contains the poll results in JSON format
    const user = req.body.user; // assuming the request body also contains the user who submitted the results
    await pool.query('INSERT INTO poll_results (results, user) VALUES ($1, $2)', [results, user]);
    sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you?');

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router;
