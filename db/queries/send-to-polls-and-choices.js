const db = require('../connection');

const addPoll = (poll) => {
  const {title, admin_link, submission_link, user_id} = poll;
  console.log("on send-to-polls");
  return db.query(
      `INSERT INTO polls (title, admin_link, submission_link, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [title, admin_link, submission_link, user_id])
    .then((result) => {
      console.log(result.rows);
      const insertedPoll = result.rows[0];
      console.log("this is the result.rows[]0", insertedPoll);
      const jsonUser = {
        id: insertedPoll.id,
        title: insertedPoll.title,
        admin_link: insertedPoll.admin_link,
        submission_link: insertedPoll.submission_link,
        user_id: insertedPoll.user_id,
      };
      console.log("this is jsonuser for addpoll", jsonUser);
      return jsonUser;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error adding user to database');
    });
};

const addChoice1 = (choice) => {
  const { choiceTitle1, choiceDescription1, poll_id } = choice;
  console.log("on send-to-choices");
  return db.query(
      `INSERT INTO choices (title, description, poll_id)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [choiceTitle1, choiceDescription1, poll_id])
    .then((result) => {
      console.log(result.rows);
      const insertedChoice = result.rows[0];
      console.log("this is the result.rows[]0", insertedChoice);
      const jsonUser = {
        id: insertedChoice.id,
        title: insertedChoice.title,
        description: insertedChoice.description,
        poll_id: insertedChoice.poll_id,
      };
      console.log("this is jsonuser for addpoll", jsonUser);
      return jsonUser;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error adding user to database');
    });
};

const addChoice2 = (choice) => {
  const { choiceTitle2, choiceDescription2, poll_id } = choice;
  console.log("on send-to-choices");
  return db.query(
      `INSERT INTO choices (title, description, poll_id)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [choiceTitle2, choiceDescription2, poll_id])
    .then((result) => {
      console.log(result.rows);
      const insertedChoice = result.rows[0];
      console.log("this is the result.rows[]0", insertedChoice);
      const jsonUser = {
        id: insertedChoice.id,
        title: insertedChoice.title,
        description: insertedChoice.description,
        poll_id: insertedChoice.poll_id,
      };
      console.log("this is jsonuser for addpoll", jsonUser);
      return jsonUser;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error adding user to database');
    });
};

module.exports = { addPoll, addChoice1, addChoice2 };
