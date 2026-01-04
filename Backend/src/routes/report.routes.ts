import { Router } from 'express';
import * as controller from '../controllers/report.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', controller.getReports);
router.post('/', authenticate, controller.createReport);
router.get('/:id', controller.getReportById);
router.put('/:id', authenticate, controller.updateReport);
router.delete('/:id', authenticate, controller.deleteReport);

export default router;
