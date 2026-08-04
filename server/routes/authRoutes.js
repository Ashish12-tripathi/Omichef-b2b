import { Router } from 'express';
import { body } from 'express-validator';
import { login, verifySession } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validateRequest,
  login
);
router.get('/verify', requireAdmin, verifySession);

export default router;
