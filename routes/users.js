/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const dbPoll = require("../db/queries/send-to-polls-and-choices");
const dbUser = require("../db/queries/users");


// //page where user can change password or name, profile
// router.get('/:user_id', (req, res) => {
//   req.session.user_id = req.params.user_id
//   res.redirect('user page');
// });

// router.get('/logout', (req, res) => {
//   res.render('user logout');
// });

router.post('/createpoll', (req, res) => {
  const { name, email, title } = req.body;
  console.log("#1 req.body",req.body);

  dbUser
  .addUser({ name, email })
    .then((user) => {
      if (!user) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Error processing user information" });
      }

      const { id } = user;
      const admin_link = generateAdminLink();
      const submission_link = generateSubmissionLink();
      console.log("user after user function", user);

      dbPoll
      .addPoll({ title, user_id: id, admin_link, submission_link })
        .then((poll) => {
          if (!poll) {
            console.error("Error creating poll:", error);
            res.status(500).send({ error: "Error creating poll" });
          }

          console.log("#2 poll", poll);
          req.session.userId = id;
          res.send("🤗");
        })
        .catch((error) => res.send(error));
    })
    .catch((error) => res.send(error));
});


module.exports = router;
