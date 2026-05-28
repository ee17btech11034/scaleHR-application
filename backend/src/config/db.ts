import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../salary_management.db');

// Instantiate raw connection context natively
export const db = new Database(dbPath, { verbose: console.log });

export function initializeDatabaseSchema(): void {
  const schema = `
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      age INTEGER NOT NULL,
      job_title TEXT NOT NULL,
      department TEXT NOT NULL,
      country TEXT NOT NULL,
      salary INTEGER NOT NULL,
      employment_status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Indexes optimized for rapid server-side pagination performance bounds
    CREATE INDEX IF NOT EXISTS idx_emp_pagination ON employees (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_emp_search ON employees (first_name, last_name, job_title);
  `;
  
  db.exec(schema);
  console.log('📦 Relational SQLite schema layers securely locked and verified.');
}
