/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//page where user can change password or name, profile
router.get('/:user_id', (req, res) => {
  req.session.user_id = req.params.user_id
  res.redirect('user page');
});


router.get('/logout', (req, res) => {
  res.render('user logout');
});






module.exports = router;
