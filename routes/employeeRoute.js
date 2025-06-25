import {
  listEmployees,
  getUserById,
  createEmployees,
  updateEmployee,
  deactivateEmployee,
} from '../controller/employes/employee.js';

import express from 'express';
const router = express.Router();

router.get('/', listEmployees);
router.get('/:id', getUserById);
router.post('/', createEmployees);
router.put('/:nip', updateEmployee);
router.delete('/:nip', deactivateEmployee);

export default router;
