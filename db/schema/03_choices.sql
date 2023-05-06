DROP TABLE IF EXISTS choices CASCADE;

CREATE TABLE choices (
  choice_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  poll_id INTEGER REFERENCES polls(poll_id) ON DELETE CASCADE
);
