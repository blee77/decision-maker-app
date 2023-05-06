const db = require("../connection");

const getResultsByPollId = async () => {
  const query = `
    SELECT u.name AS user_name, p.expiration_date, p.title, r.choice_id, c.title AS choice_title, r.rank
    FROM results r
    JOIN choices c ON r.choice_id = c.choice_id
    JOIN polls p ON c.poll_id = p.poll_id
    JOIN users u ON p.user_id = u.user_id
    GROUP BY p.poll_id, u.name, p.expiration_date, p.title, r.choice_id, c.title, r.rank;
  `;
  const data = await db.query(query);
  return data.rows;
};

module.exports = { getResultsByPollId };
