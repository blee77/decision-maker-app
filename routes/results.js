/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into results,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pool = require('../db/connection.js');
const { getPollResultsByID } = require('../db/queries/results.js');
// const { getResultsByPollId } = require("../db/queries/getResultsByPollId.js");
/* GET /results */
//This will contain the winner and points obtained by each option.

router.get('/', (req, res) => {
  res.render('results');
});


// // Route to retrieve poll results and the corresponding users
// router.get('/:id', async(req, res) => {
//   const results = getPollResultsByID(req.params.id)
//   .then
//   console.log("results", results);
//     res.render('results', { results: results });
//   });

router.get('/:id', (req, res) => {
  pool.query('SELECT poll_id FROM polls WHERE admin_link = $1;',
  [`/results/${req.params.id}`])
  .then ((polls) => {
    console.log("polls", polls);
    const poll_id = polls.rows[0].poll_id;

    getPollResultsByID(poll_id)
    .then((result) => {
      let results = result;
      console.log(results);
      res.render('results', { results: results });
    })
    .catch((reject) => {
      res.render('pageNotFound');
    });

  })
});

module.exports = router;
