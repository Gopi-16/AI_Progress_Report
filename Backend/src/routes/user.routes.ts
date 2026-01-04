import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import * as controller from '../controllers/user.controller';

const router = Router();

router.get('/me', authenticate, controller.getMe);
router.get('/', authenticate, requireRole('admin'), controller.listUsers);

export default router;
