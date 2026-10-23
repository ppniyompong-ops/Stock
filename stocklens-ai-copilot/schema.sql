CREATE TABLE IF NOT EXISTS market_snapshots (
  as_of_date DATE NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  price NUMERIC(20, 6) NOT NULL,
  change NUMERIC(20, 6),
  change_percent NUMERIC(12, 6),
  day_high NUMERIC(20, 6),
  day_low NUMERIC(20, 6),
  day_open NUMERIC(20, 6),
  previous_close NUMERIC(20, 6),
  quote_time TIMESTAMPTZ,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (as_of_date, symbol)
);

CREATE INDEX IF NOT EXISTS idx_market_snapshots_symbol_date
  ON market_snapshots (symbol, as_of_date DESC);

CREATE TABLE IF NOT EXISTS market_briefs (
  as_of_date DATE PRIMARY KEY,
  summary TEXT NOT NULL,
  model VARCHAR(80) NOT NULL,
  symbols_count INTEGER NOT NULL DEFAULT 0,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cron_runs (
  id BIGSERIAL PRIMARY KEY,
  job_name VARCHAR(80) NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  status VARCHAR(16) NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'succeeded', 'failed')),
  details JSONB NOT NULL DEFAULT '{}'::JSONB,
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_cron_runs_job_started
  ON cron_runs (job_name, started_at DESC);
