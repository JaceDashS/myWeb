// server/src/controllers/appController.ts
import { Request, Response } from 'express';
import { getAllApps } from '../services/appService';

/**
 * 활성화된 앱 조회 컨트롤러 (페이지네이션)
 */
export async function getAllAppsController(req: Request, res: Response): Promise<void> {
  try {
    // 쿼리 파라미터에서 page와 limit 가져오기 (기본값: page=1, limit=5)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    // 유효성 검사
    if (page < 1 || limit < 1) {
      res.status(400).json({ error: 'page와 limit은 1 이상이어야 합니다.' });
      return;
    }

    const result = await getAllApps(page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error('getAllAppsController 오류:', error);
    res.status(500).json({ error: '앱 목록을 가져오는 중 오류가 발생했습니다.' });
  }
}

