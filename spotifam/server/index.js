import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/cors.js';
import { userRoutes } from './routes/users.js';
import { matchRoutes } from './routes/matches.js';
import { errorHandler } from './middleware/errorHandler.js';
import { db } from './config/database.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize database schema
const schema = readFileSync(join(__dirname, 'db/schema.sql'), 'utf-8');
db.exec(schema);

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle cleanup
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});