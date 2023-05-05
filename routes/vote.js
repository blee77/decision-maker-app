/*
 * All routes for Votes Data are defined here
 * Since this file is loaded in server.js into vote,
 *   these routes are mounted onto /vote
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { sendEmail } = require('../lib/sendgrid.js');
/* GET /vote */
//In vote.ejs file we display a question with options, where the user
// could drag and drop the options based on the preferences.

router.get('/', (req, res) => {
  res.render('vote');
});


//In this post route we make a DB call to insert into results table.
//Once insertion is successful, we call the sendEmail function.
//this email will contain a link for results.

router.post('/', (req, res) => {
  //1) Get information from req.body
  //2) Call a DB function with the information, that DB function is from
  //3) add votes a function that will use the PG addVotes(req.body)coming from there

  sendEmail('brucehlee@yahoo.ca', 'Decision Maker App','This is your vote results here');

  res.render('vote');
});



module.exports = router;




// // Sure, here is some example code for submitting a vote and
// // getting the results using JavaScript:

// Submitting a vote:

// javascript
// Copy code
// // Define the poll ID and the user's choices
// const pollId = 123;
// const choices = [2, 1, 3]; // Ranked from highest (most preferred) to lowest (least preferred)

// // Define the request body
// const requestBody = {
//   pollId: pollId,
//   choices: choices
// };

// // Send the POST request to submit the vote
// fetch('/api/submit-vote', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(requestBody)
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Error submitting vote');
//   }
//   // Success
// })
// .catch(error => {
//   console.error(error);
// });
// Getting the results:

// javascript
// Copy code
// // Define the poll ID
// const pollId = 123;

// // Send the GET request to get the results
// fetch(`/api/get-results?pollId=${pollId}`)
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Error getting results');
//   }
//   // Parse the response body as JSON
//   return response.json();
// })
// .then(results => {
//   // Do something with the results (e.g. display them in the UI)
// })
// .catch(error => {
//   console.error(error);
// });
// Note that the above code assumes that you
// have implemented the backend API endpoints for
// submitting a vote (/api/submit-vote) and getting the
// results (/api/get-results). You'll need to replace
// the URL paths and request bodies with your own implementation.






