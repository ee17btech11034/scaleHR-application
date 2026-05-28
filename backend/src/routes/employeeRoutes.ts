import { Router } from 'express';
import { getPaginatedEmployees } from '../controllers/employeeController.js';

const router = Router();

router.get('/', getPaginatedEmployees);

export default router;
