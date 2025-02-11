// server/src/routes/commentRoutes.ts
import { Router } from 'express';
import {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  // getParentCommentsController,
  // getChildCommentsController,
  getCommentHistoryController, // 히스토리 조회 컨트롤러 추가
  getCommentsController,
} from '../controllers/commentController';

const router = Router();

// 댓글 생성
router.post('/', createCommentController);

// 부모 댓글 목록 (페이지네이션)
// router.get('/', getParentCommentsController);

// 부모 댓글 + 자식 댓글 함께 조회 (페이지네이션)
router.get('/', getCommentsController);

// 특정 부모 댓글의 대댓글 조회
// router.get('/:id/child', getChildCommentsController);

// 특정 댓글의 히스토리 조회
router.get('/:id/history', getCommentHistoryController);

// [PUT] 댓글 수정
router.put('/:id', updateCommentController);

// [DELETE] 댓글 삭제
router.delete('/:id', deleteCommentController);

export default router;
