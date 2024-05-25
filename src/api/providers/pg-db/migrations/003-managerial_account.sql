CREATE TABLE IF NOT EXISTS managerial_account (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "value" FLOAT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PROCESSING',
  "origin_account" BIGINT NOT NULL,
  "target_account" BIGINT NOT NULL,
  "token" VARCHAR DEFAULT gen_random_uuid(),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)