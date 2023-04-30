/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

/* GET /poll */
router.get('/', (req, res) => {
  res.send("Add Poll Form");
});

/* POST /poll */
router.post('/', (req, res) => {

  // sendEmail(req.params.users);  //from the frontend
  // console.log(req.params.users);

  res.send("Add Poll creation submission");
});

/* GET /poll/:pollId */
router.get('/:pollId', (req, res) => {
  res.send(`render poll ${req.params.pollId}`);
});

/* POST /poll/:pollId/vote */
router.post('/:pollId/vote', (req, res) => {
  res.send(`render poll ${req.params.pollId}`);
});

/* GET /poll/:pollId/result Admin */
router.get('/:pollId/result', (req, res) => {
  res.send(`render poll results for Id ${req.params.pollId}`);
});


module.exports = router;
