import {
  login,
} from '../controller/auth/auth.js';

import express from 'express';
const router = express.Router();

router.post('/', login);

export default router;
