DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "user_id" SERIAL NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("user_id")
);



