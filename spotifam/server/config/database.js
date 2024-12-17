import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../data/spotifam.db');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

export { db };