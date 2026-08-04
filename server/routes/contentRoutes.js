import { Router } from 'express';
import { getContent, resetContent, updateContent } from '../controllers/contentController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getContent);
router.put('/', requireAdmin, updateContent);
router.post('/reset', requireAdmin, resetContent);

export default router;
