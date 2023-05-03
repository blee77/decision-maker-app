/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into results,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pool = require('../db/connection.js');
/* GET /results */
//This will contain the winner and points obtained by each option.

router.get('/', (req, res) => {
  res.render('results');
});


// Route to retrieve poll results and the corresponding users
router.get('/:id', async(req, res) => {
  try {

    //What is the data structure? Gives you idea how to write the query what tables will beed to be joined, 2) what do you need to select tables to?
    const result = await pool.query(`SELECT * FROM results

    RIGHT JOIN choices ON choices.choice_id = results.choice_id
    LEFT JOIN polls ON polls.poll_id = choices.poll_id

    WHERE choices.poll_id = $1`,
    [req.params.id]

    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router;
