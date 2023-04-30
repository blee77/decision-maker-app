/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into vote,
 *   these routes are mounted onto /vote
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

/* GET /vote */
router.get('/', (req, res) => {
  res.render('vote');
});

module.exports = router;
