CREATE TABLE IF NOT EXISTS customers (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "doc" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "account" BIGINT NOT NULL,
  "wallet" FLOAT NOT NULL,
  "type" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)


   



