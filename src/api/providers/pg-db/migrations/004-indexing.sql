CREATE INDEX IF NOT EXISTS doc_index  ON customers("doc");
CREATE INDEX IF NOT EXISTS account_index  ON customers("account");
CREATE INDEX IF NOT EXISTS token_index  ON managerial_account("token");