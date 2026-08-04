import { Router } from 'express';
import { body } from 'express-validator';
import {
  createInquiry,
  deleteInquiry,
  listInquiries,
  updateInquiry
} from '../controllers/inquiryController.js';
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
    body('buyerType').trim().notEmpty(),
    body('message').trim().isLength({ min: 10, max: 3000 })
  ],
  validateRequest,
  createInquiry
);
router.get('/', requireAdmin, listInquiries);
router.patch('/:id', requireAdmin, updateInquiry);
router.delete('/:id', requireAdmin, deleteInquiry);

export default router;
