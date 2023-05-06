// const addUser = (user) => {
//   const {name, email} = user;
//   return db.query(
//       INSERT INTO users (name, email)
//       VALUES ($1, $2)
//       RETURNING *;,
//       [name, email])
//     .then((result) => {
//       console.log(result.rows);
//       const insertedUser = result.rows[0];
//       const jsonUser = {
//         id: insertedUser.id,
//         name: insertedUser.name,
//         email: insertedUser.email,
//       };
//       return jsonUser;
//     })
//     .catch((err) => {
//       console.error(err);
//       throw new Error('Error adding user to database');
//     });
// };
