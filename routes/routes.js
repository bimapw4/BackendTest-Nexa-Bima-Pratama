import express from 'express';
import userRoutes from './employeeRoute.js';
import authRoutes from './authRoute.js';
import authMiddleware from '../middleware/validate_token.js';

const router = express.Router();

router.use('/users', authMiddleware, userRoutes);
router.use('/login', authRoutes);

export default router;
