-- Portfolio — schéma PostgreSQL (exécuter avec : psql -U postgres -d portfolio_db -f init.sql)

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;
GRANT SELECT, INSERT ON contact_messages TO portfolio_user;
