DROP TABLE IF EXISTS choices CASCADE;
-- CREATE TABLE "choices" (
--   "choice_id" SERIAL,
--   "title" VARCHAR(255) NOT NULL,
--   "description" VARCHAR(500),
--   "poll_id" INT,
--   PRIMARY KEY ("choice_id"),
--   CONSTRAINT "FK_choices.poll_id"
--     FOREIGN KEY ("poll_id")
--       REFERENCES "polls"("poll_id")
-- );

CREATE TABLE "choices" (
  "choice_id" SERIAL,
  "title" VARCHAR(255) NOT NULL,
  "description" text,
  "poll_id" INT,
  PRIMARY KEY ("choice_id"),
  CONSTRAINT "FK_choices.poll_id"
    FOREIGN KEY ("poll_id")
      REFERENCES "polls"("poll_id")
);

CREATE TABLE "results" (
  "result_id" SERIAL,
  "choice_id" INT,
  "name" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("result_id"),
  CONSTRAINT "FK_results.choice_id"
    FOREIGN KEY ("choice_id")
      REFERENCES "choices"("choice_id")
);

