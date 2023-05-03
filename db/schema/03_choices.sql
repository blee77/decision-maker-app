DROP TABLE IF EXISTS choices CASCADE;


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
