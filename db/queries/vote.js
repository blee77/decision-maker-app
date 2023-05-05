const db = require("../connection");

const getChoicesByPollId = (pollId) => {
  return db
    .query("SELECT * FROM choices WHERE poll_id = $1;", [pollId])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getChoicesByPollId };
