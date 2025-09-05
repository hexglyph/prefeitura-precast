CREATE TABLE IF NOT EXISTS indicators (
  indicator_id INTEGER PRIMARY KEY,
  name TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS indicator_results (
  id BIGSERIAL PRIMARY KEY,
  indicator_id INTEGER NOT NULL REFERENCES indicators(indicator_id) ON DELETE CASCADE,
  nivel TEXT NOT NULL, -- D, MUN, SUB, P, EST
  regiao_code INTEGER,
  regiao_name TEXT,
  periodo TEXT NOT NULL,
  value_num NUMERIC,
  value_raw TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (indicator_id, nivel, regiao_code, periodo)
);

CREATE INDEX IF NOT EXISTS idx_indicator_results_lookup
  ON indicator_results (indicator_id, nivel, regiao_name, periodo);

