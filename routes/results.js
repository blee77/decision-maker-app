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
/* GET /results */
//This will contain the winner and points obtained by each option.

router.get('/', (req, res) => {
  res.render('results');
});


// Route to retrieve poll results and the corresponding users
router.get('/:id', async(req, res) => {
  getPollResultsByID(req.params.id)
  .then((result) => {
    let results = result;
    console.log(results);
    res.render('results', { results: results });
  })
  .catch((reject) => {
    res.render('pageNotFound');
  });
});


module.exports = router;
