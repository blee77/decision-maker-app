const db = require("../connection");

const addVoteToResults = (choiceId, name, rank) => {
  return db
    .query(
      "INSERT INTO results (choice_id, name, rank) VALUES ($1, $2, $3) RETURNING *;",
      [choiceId, name, rank]
    )
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { addVoteToResults };
