DROP TABLE IF EXISTS polls CASCADE;


CREATE TABLE "polls" (
  "poll_id" SERIAL,
  "title" VARCHAR(255) NOT NULL,
  "admin_link" VARCHAR(255) NOT NULL,
  "submission_link" VARCHAR(255) NOT NULL,
  "user_id" INT,
  "expiration_date" DATE,
  PRIMARY KEY ("poll_id"),
  CONSTRAINT "FK_polls.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id")
);
