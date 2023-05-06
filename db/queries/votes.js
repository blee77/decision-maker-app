const db = require('../connection');

//1) Insert a result into DB
//2) Need to give info of what to insert
//3) Have a proper insert query
//4) Tell function what votes you want to add , coming from routes directly

const addVotes = (votes) => {
  return db.query('INSERT INTO results (choice_id, name, rank) VALUES ;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { addVotes };


