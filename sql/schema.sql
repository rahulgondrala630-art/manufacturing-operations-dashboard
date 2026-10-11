-- Flexible record payloads are validated by the API. Run only in a dedicated demo database.
CREATE TABLE IF NOT EXISTS records (
 id TEXT PRIMARY KEY,
 entity TEXT NOT NULL CHECK (entity IN ('incidents','lines')),
 payload JSONB NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS records_entity_created_idx ON records(entity,created_at DESC);
CREATE INDEX IF NOT EXISTS records_status_idx ON records((payload->>'status'));
