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

const pool = require("../db/connection.js");

const { sendEmail } = require("../lib/sendgrid.js");

/* GET /poll/createpoll */
router.get("/createpoll", (req, res) => {
  //Inside the create poll.ejs write a simple form where the user could enter a question and options
  res.render("createpoll");
});

/* POST /poll/createpoll */
router.post("/createpoll", (req, res) => {
  //Insert into polls table
  //Once insertion into poll table is successful , call the send email function.
  // req.session.email = req.body.email;
  console.log("pollData:", req.body);
  console.log("Test:",req.session);
  sendEmail(req.body.email, 'Decision Maker App','Hello How are you? Please click on the link to access the poll : www.example.com');

  sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','Hello How are you? Please click on the link to access the poll : www.example.com');

  res.render('createpoll');
});

/* GET /poll/choices */
router.get("/createchoices/:id", (req, res) => {
  //Inside the create poll.ejs write a simple form where the user could enter a question and options
  res.render("createchoices");
});

/* POST /poll/choices */
router.post("/createpoll", (req, res) => {
  //Insert into polls table
  //Once insertion into poll table is successful , call the send email function.
  console.log("pollData:", req.body);

  sendEmail(
    "brucehlee@yahoo.ca",
    "Decision Maker App",
    "Hello How are you? Please click on the link to access the poll : www.example.com"
  );

  res.render("createpoll");
});

// Route to add poll results to the database
router.post("/results", async (req, res) => {
  try {
    const results = req.body.results; // assuming the request body contains the poll results in JSON format
    const user = req.body.user; // assuming the request body also contains the user who submitted the results
    await pool.query(
      "INSERT INTO poll_results (results, user) VALUES ($1, $2)",
      [results, user]
    );
    sendEmail(
      "brucehlee@yahoo.ca",
      "Decision Maker App",
      "Hello How are you? Please click on the link to access the poll : www.example.com"
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
