CREATE TABLE IF NOT EXISTS managerial_account (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "value" NUMERIC(10, 2) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PROCESSING',
  "origin_account" INT NOT NULL,
  "target_account" INT NOT NULL,
  "token" VARCHAR DEFAULT gen_random_uuid(),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)