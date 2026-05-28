import { Router } from 'express';
import { calculateCompensationMetrics } from '../controllers/analyticsController.js';

const router = Router();

// Endpoint triggered on search submission configurations
router.post('/', calculateCompensationMetrics);

export default router;
