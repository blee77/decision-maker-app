const db = require('../connection');

const getPollsByID = (poll_id) => {
  return db.query(`
  SELECT *
  FROM polls
  WHERE poll_id = $1;`,
  [poll_id])
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getPollsByID };


