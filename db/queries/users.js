const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const addUser = (user) => {
  const {name, email} = user;
  return db.query(
      `INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *;`,
      [name, email])
    .then((result) => {
      const insertedUser = result.rows[0];
      const jsonUser = {
        id: insertedUser.user_id,
        name: insertedUser.name,
        email: insertedUser.email,
      };
      console.log("#1 jsonUser", jsonUser);
      return jsonUser;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error adding user to database');
    });
};

module.exports = { getUsers, addUser };


