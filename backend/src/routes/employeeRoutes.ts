import { Router } from 'express';
import { 
  getPaginatedEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../controllers/employeeController.js';

const router = Router();

router.get('/', getPaginatedEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
