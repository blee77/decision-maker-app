DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL,
  choice_id INT,
  "name" VARCHAR(255) NOT NULL,
  "rank" INT,
    FOREIGN KEY ("choice_id")
      REFERENCES "choices"("choice_id")
);

  -- PRIMARY KEY ("result_id"),
  -- CONSTRAINT "FK_results.choice_id"
