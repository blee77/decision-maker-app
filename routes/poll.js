/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getChoicesByPollId } = require("../db/queries/vote");
const { addVoteToResults } = require("../db/queries/results");

/* GET /poll */
router.get("/", (req, res) => {
  res.send("Add Poll Form");
});
/* POST /poll */
router.post("/", (req, res) => {
  res.send("Add Poll creation submission");
});

/* GET /poll/:pollId */
router.get("/:pollId", (req, res) => {
  res.send(`render poll ${req.params.pollId}`);
});

// /* GET /poll/:pollId/vote */
// router.get("/:pollId/vote", (req, res) => {
//   const pollId = req.params.pollId;
//   // use the pollId to render the vote page or perform any other actions
//   res.render("votes", { pollId: pollId });
// });
router.get("/:pollId/vote", (req, res) => {
  const pollId = req.params.pollId;

  // Fetch choices by poll ID
  getChoicesByPollId(pollId)
    .then((choices) => {
      res.render("votes", { pollId, choices });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

// submit result
// router.post("/:pollId/vote", (req, res) => {
//   const choices = req.body.choices;

//   console.log(choices);
//   // for (let i = 0; i < choices.length; i++) {
//   //   const choice = choices[i];
//   //   const query = {
//   //     text: "INSERT INTO results (choice_id, name, rank) VALUES ($1, $2, $3)",
//   //     values: [choice.id, choice.name, choice.rank],
//   //   };
//   //   db.query(query).catch((error) => console.log(error));
//   // }
//   res.redirect("/");
// });

router.post("/:pollId/vote", async (req, res) => {
  try {
    //const pollId = req.params.pollId;
    const choices = req.body.choices;
    console.log(choices);
    //Insert the vote data into the results table
    for (const choice of choices) {
      await addVoteToResults(choice.choiceId, choice.title, choice.rank);
    }

    // Redirect to the poll results page
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error submitting vote");
  }
});

//router.post("/:pollId/submit", submitResult);

/* POST /poll/:pollId/vote */
// router.post("/:pollId/vote", (req, res) => {
//   res.send(`render poll ${req.params.pollId}`);
// });

/* GET /poll/:pollId/result Admin */
router.get("/:pollId/result", (req, res) => {
  res.send(`render poll results for Id ${req.params.pollId}`);
});

/* GET /poll/createpoll */
router.get("/createpoll", (req, res) => {
  res.render("createpoll");
});

/* GET /poll/sharelink */
router.get("/sharelink", (req, res) => {
  res.render("share-link");
});

// /* POST /poll */
// router.post('/', (req, res) => {
//   res.send("Add Poll creation submission");
// });

// /* GET /poll/:pollId */
// router.get('/:pollId', (req, res) => {
//   res.send(`render poll ${req.params.pollId}`);
// });

// /* POST /poll/:pollId/vote */
// router.post('/:pollId/vote', (req, res) => {
//   res.send(`render poll ${req.params.pollId}`);
// });

// /* GET /poll/:pollId/result Admin */
// router.get('/:pollId/result', (req, res) => {
//   res.send(`render poll results for Id ${req.params.pollId}`);
// });

module.exports = router;
