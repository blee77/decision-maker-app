/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into results,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

/* GET /results */
//This will contain the winner and points obtained by each option.

router.get('/', (req, res) => {
  res.render('results');
});

module.exports = router;
