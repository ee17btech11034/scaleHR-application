import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabaseSchema } from './config/db.js';
import employeeRouter from './routes/employeeRoutes.js';
import analyticsRouter from './routes/analyticsRoutes.js'; // <-- Import new analytics router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Synchronize Database Schema Primitives
initializeDatabaseSchema();

// Mount Application API Endpoints
app.use('/api/employees', employeeRouter);
app.use('/api/analytics', analyticsRouter); // <-- Attach the analytics engine here

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`🚀 Node+Express background services active on target port ${PORT}`);
});
