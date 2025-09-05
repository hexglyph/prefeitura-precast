-- Insights table to store AI analyses on city data (no extensions required)
CREATE TABLE IF NOT EXISTS insights (
  id BIGSERIAL PRIMARY KEY,
  scope TEXT NOT NULL, -- e.g., 'geral', 'area:seguranca', 'subprefeitura:zonaleste'
  input JSONB NOT NULL, -- raw input or parameters
  output TEXT NOT NULL, -- AI insight/result
  metadata JSONB DEFAULT '{}'::jsonb, -- model, tokens, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Optional events table for future ingestion
CREATE TABLE IF NOT EXISTS city_events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT,
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  impact TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
