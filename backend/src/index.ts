import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabaseSchema } from './config/db.js';
import employeeRouter from './routes/employeeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Run SQLite Table schema configuration initialization checks
initializeDatabaseSchema();

// Mount endpoints
app.use('/api/employees', employeeRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express service listening on port ${PORT}`);
});
