DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  poll_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  admin_link VARCHAR(255) NOT NULL,
  submission_link VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  expiration_date DATE
);


