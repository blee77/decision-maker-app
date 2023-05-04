const db = require('../connection');

const getPollResultsByID = (poll_id) => {
  return db.query(`
    SELECT polls.poll_id,
      polls.title as poll_title,
      choices.title as choice_title,
      SUM (results.rank) as result
    FROM polls
    JOIN choices ON polls.poll_id = choices.poll_id
    JOIN results ON choices.choice_id = results.choice_id
    WHERE polls.poll_id = $1
    GROUP BY choices.title, polls.poll_id
    ORDER BY SUM(results.rank) DESC;`,
  [poll_id])
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getPollResultsByID };


