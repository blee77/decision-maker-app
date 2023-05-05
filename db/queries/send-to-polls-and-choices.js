const db = require('../connection');

const addPoll = (poll) => {
  const {title, admin_link, submission_link, user_id} = poll;
  return db.query(
      `INSERT INTO polls (title, admin_link, submission_link, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [title, admin_link, submission_link, user_id])
    .then((result) => {
      console.log(result.rows);
      const insertedPoll = result.rows[0];
      const jsonUser = {
        id: insertedPoll.id,
        title: insertedPoll.title,
        admin_link: insertedPoll.admin_link,
        submission_link: insertedPoll.submission_link,
        user_id: insertedPoll.user_id,
      };
      return jsonUser;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error adding user to database');
    });
};

module.exports = { addPoll };
