import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment
} from '../controllers/appointmentController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().isLength({ min: 7, max: 30 }),
    body('company').trim().isLength({ min: 2, max: 150 }),
    body('preferredDate').isISO8601(),
    body('preferredTime').trim().notEmpty()
  ],
  validateRequest,
  createAppointment
);
router.get('/', requireAdmin, listAppointments);
router.patch('/:id', requireAdmin, updateAppointment);
router.delete('/:id', requireAdmin, deleteAppointment);

export default router;
