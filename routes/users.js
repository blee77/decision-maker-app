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
const helpers = require("../lib/helpers");
const sendgrid = require("../lib/sendgrid");


// //page where user can change password or name, profile
// router.get('/:user_id', (req, res) => {
//   req.session.user_id = req.params.user_id
//   res.redirect('user page');
// });

// router.get('/logout', (req, res) => {
//   res.render('user logout');
// });

router.post('/createpoll', (req, res) => {
  const { name, email, title, choiceTitle1, choiceDescription1, choiceTitle2, choiceDescription2} = req.body;

  dbUser
  .addUser({ name, email })
    .then((user) => {
      console.log("user after user function", user);
      if (!user) {
        console.error("Error adding user:", error);
        return res.status(500).json({ error: "Error processing user information" });
      }

      const user_id = user.id;
      const admin_link = helpers.generateAdminLink();
      const submission_link = helpers.generateSubmissionLink();

      dbPoll
      .addPoll({ title, user_id, admin_link, submission_link })
        .then((poll) => {
          if (!poll) {
            console.error("Error creating poll:", error);
            return res.status(500).json({ error: "Error creating poll" });
          }

          const poll_id = poll.id;

      dbPoll.addChoice1({ choiceTitle1, choiceDescription1, poll_id })
      .then((choice) => {
        if (!choice) {
          console.error("Error creating choices:", error);
          return res.status(500).json({ error: "Error creating choices" });
        }

        dbPoll.addChoice2({ choiceTitle2, choiceDescription2, poll_id })
        .then((choice) => {
          if (!choice) {
            console.error("Error creating choices:", error);
            return res.status(500).json({ error: "Error creating choices" });
          }

          sendgrid.sendEmail(req.body.email,
            'Decision Maker App',
`Hello How are you?

Please click on the link to access the poll results :

http://localhost:8080${admin_link}

You can share this poll with the following link:

http://localhost:8080/poll/${poll_id}/vote`);

          // req.session.userId = id;
          // res.redirect(`/poll/${poll_id}/sharepoll`);
          res.status(200).json({poll_id});
        })
        .catch((error) => {
          console.log("error1", error);
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      console.log("error2", error);
      res.status(500).json(error)
    });
  })
    .catch((error) => {
      console.log("error3", error);
      res.status(500).json(error)
    });
})
});

module.exports = router;
