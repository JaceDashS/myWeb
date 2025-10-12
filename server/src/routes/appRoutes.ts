// server/src/routes/appRoutes.ts
import { Router } from 'express';
import { getAllAppsController } from '../controllers/appController';

const router = Router();

// 모든 활성화된 앱 조회
router.get('/', getAllAppsController);

export default router;

