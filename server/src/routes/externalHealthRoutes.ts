// server/src/routes/externalHealthRoutes.ts
import { Router } from 'express';
import {
  getServiceHealthController,
  getAllServicesHealthController,
} from '../controllers/externalHealthController';

const router = Router();

// 외부 서비스 헬스체크 - 특정 서비스
router.get('/health/:service', getServiceHealthController);

// 외부 서비스 헬스체크 - 모든 서비스
router.get('/health', getAllServicesHealthController);

export default router;

