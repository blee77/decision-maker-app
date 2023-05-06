const db = require("../connection");

const getPollLinkById = (pollId) => {
  return db
    .query(
      "SELECT poll_id,admin_link, submission_link FROM polls WHERE poll_id = $1;",
      [pollId]
    )
    .then((data) => {
      return data.rows[0]; // return the first row (should only be one row)
    });
};

module.exports = { getPollLinkById };
