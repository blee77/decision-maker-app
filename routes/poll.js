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
const { getResultsByPollId } = require("../db/queries/getResultsByPollId");

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

router.post("/:pollId/vote", async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const choices = req.body.choices;
    //console.log(choices);
    //Insert the vote data into the results table
    for (const choice of choices) {
      await addVoteToResults(choice.choiceId, choice.title, choice.rank);
    }

    // Redirect to the poll results page
    //console.log()
    //http://localhost:8080/poll/3/poll/results
    res.redirect(`/poll/${pollId}/results`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error submitting vote");
  }
});

router.get("/:pollId/results", (req, res) => {
  //console.log(getResultsByPollId());
  getResultsByPollId()
    .then((results) => {
      //results = ["test"];
      //console.log(results);
      //const x = { results };
      res.render("results", { results });
    })
    .catch((err) => {
      console.log(err);
      res.send("An error occurred");
    });
});
// router.get("/results", (req, res) => {
//   // Assuming your results table is defined as a variable called `results`

//   // Calculate the winners for food type
//   const winnersFood = calculateBordaCount(
//     results.filter((r) => r.choice_id > 6)
//   );

//   // Calculate the winners for travel destination
//   const winnersTravel = calculateBordaCount(
//     results.filter((r) => r.choice_id <= 6)
//   );

// Render the `results.ejs` template and pass the winners arrays as variables
//   res.render("results", { winnersFood, winnersTravel });
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
