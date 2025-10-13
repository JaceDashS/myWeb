// server/src/controllers/commentController.ts
import { Request, Response } from 'express';
import { getHashedIP } from '../utils/hashUtils';
import { getClientIP } from '../utils/requestUtils';
import {
  createComment,
  updateComment,
  deleteComment,
  // getParentComments,
  // getChildComments,
  getCommentHistory,
  getComments,
} from '../services/commentService';

/**
 * 댓글 생성 컨트롤러
 */
export async function createCommentController(req: Request, res: Response): Promise<void> {
  const { parentHeaderId, content, userPassword } = req.body;
  if (!content) {
    res.status(400).json({ error: 'contentが必要' });
    return;
  }
  if (!userPassword) {
    res.status(400).json({ error: 'userPasswordが必要' });
    return;
  }

  try {
    const ip = getClientIP(req);
    // console.log(`클라이언트 IP: ${ip}`); // 디버깅 로그
    const hashedUserIP = getHashedIP(ip);

    const newId = await createComment(
      parentHeaderId ?? null,
      content,
      hashedUserIP,
      userPassword
    );
    res.status(201).json({ id: newId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

/**
 * 댓글 수정 컨트롤러
 */
export async function updateCommentController(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { content, userPassword } = req.body;

  if (!content) {
    res.status(400).json({ error: 'content가 필요합니다.' });
    return;
  }
  if (!userPassword) {
    res.status(400).json({ error: 'userPassword가 필요합니다.' });
    return;
  }

  try {
    const ip = getClientIP(req);
    // console.log(`클라이언트 IP: ${ip}`); // 디버깅 로그
    const hashedUserIP = getHashedIP(ip);

    const updatedId = await updateComment(
      Number(id),
      content,
      hashedUserIP,
      userPassword
    );
    res.status(200).json({ id: updatedId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

/**
 * 댓글 삭제 컨트롤러
 */
export async function deleteCommentController(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { userPassword } = req.body;

  if (!userPassword) {
    res.status(400).json({ error: 'userPassword가 필요합니다.' });
    return;
  }

  try {
    // 1️⃣ 요청한 사용자의 IP를 해싱
    const ip = getClientIP(req);
    // console.log(`클라이언트 IP: ${ip}`); // 디버깅 로그
    const hashedUserIP = getHashedIP(ip);

    // 2️⃣ `deleteComment` 호출 시 `newHashedUserIP` 추가
    const deletedId = await deleteComment(Number(id), userPassword, hashedUserIP);

    res.status(200).json({ id: deletedId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

// /**
//  * 부모 댓글 조회 컨트롤러 (페이지네이션)
//  */
// export async function getParentCommentsController(req: Request, res: Response): Promise<void> {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;

//   try {
//     // 1) 서비스 호출
//     const { comments, totalCount } = await getParentComments(page, limit);

//     // 2) 필드 매핑: 서버 필드 → 클라이언트 필드
//     const mappedComments = comments.map((item: any) => ({
//       id: item.ID,                            // ID는 React key로 사용
//       parentHeaderId: item.PARENT_HEADER_ID,  // PARENT_ID → PARENT_HEADER_ID
//       content: item.CONTENT,
//       createdAt: item.CREATED_AT,
//       updatedAt: item.UPDATED_AT,
//       isEdited: item.IS_EDITED,
//       isDeleted: item.IS_DELETED,
//       version: item.VERSION,
//       editedCommentId: item.EDITED_COMMENT_ID,
//       headerId: item.HEADER_ID,
//       tailId: item.TAIL_ID,
//       hashedUser: item.HASHED_USER_IP,
//     }));

//     // 3) 응답 전송
//     res.status(200).json({
//       page,
//       limit,
//       totalCount,
//       data: mappedComments,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: (error as Error).message });
//   }
// }

// /**
//  * 특정 부모 댓글의 대댓글 조회 컨트롤러
//  */
// export async function getChildCommentsController(req: Request, res: Response): Promise<void> {
//   const { id } = req.params;

//   try {
//     const data = await getChildComments(Number(id));

//     // 2) 필드 매핑: 서버 필드 → 클라이언트 필드
//     const mappedData = data.map((item: any) => ({
//       id: item.ID,
//       parentHeaderId: item.PARENT_HEADER_ID,  // PARENT_ID → PARENT_HEADER_ID
//       content: item.CONTENT,
//       createdAt: item.CREATED_AT,
//       updatedAt: item.UPDATED_AT,
//       isEdited: item.IS_EDITED,
//       isDeleted: item.IS_DELETED,
//       version: item.VERSION,
//       editedCommentId: item.EDITED_COMMENT_ID,
//       headerId: item.HEADER_ID,
//       tailId: item.TAIL_ID,
//       hashedUser: item.HASHED_USER_IP,
//     }));

//     res.status(200).json({ data: mappedData });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// }

/**
 * 댓글 히스토리 조회 컨트롤러
 */
export async function getCommentHistoryController(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const history = await getCommentHistory(Number(id));

    // 필드 매핑: 서버 필드 → 클라이언트 필드
    const mappedHistory = history.map((item) => ({
      id: item.id,
      parentHeaderId: item.parentHeaderId,  // parentId → parentHeaderId
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      isEdited: item.isEdited,
      isDeleted: item.isDeleted,
      version: item.version,
      editedCommentId: item.editedCommentId,
      headerId: item.headerId,
      tailId: item.tailId,
      hashedUser: item.hashedUserIP,
    }));

    res.status(200).json({ history: mappedHistory });
  } catch (error) {
    console.error('댓글 히스토리 조회 컨트롤러 오류:', error);
    res.status(500).json({ error: (error as Error).message });
  }
}



/**
 * 부모 댓글과 해당 자식 댓글을 함께 조회하는 컨트롤러 (페이지네이션)
 */
export async function getCommentsController(req: Request, res: Response): Promise<void> {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  try {
    // 서비스 호출
    const { comments, totalCount } = await getComments(page, limit);

    // 필드 매핑 (필요한 경우 클라이언트에 맞게 변환)
    const mappedComments = comments.map((item: any) => ({
      id: item.ID,
      parentHeaderId: item.PARENT_HEADER_ID,  // 부모 댓글의 경우 null
      content: item.CONTENT,
      createdAt: item.CREATED_AT,
      updatedAt: item.UPDATED_AT,
      isEdited: item.IS_EDITED,
      isDeleted: item.IS_DELETED,
      version: item.VERSION,
      editedCommentId: item.EDITED_COMMENT_ID,
      headerId: item.HEADER_ID,
      tailId: item.TAIL_ID,
      hashedUser: item.HASHED_USER_IP,
      // 자식 댓글도 동일하게 매핑 (없으면 빈 배열)
      children: (item.children || []).map((child: any) => ({
        id: child.ID,
        parentHeaderId: child.parentHeaderId,
        content: child.CONTENT,
        createdAt: child.CREATED_AT,
        updatedAt: child.UPDATED_AT,
        isEdited: child.IS_EDITED,
        isDeleted: child.IS_DELETED,
        version: child.VERSION,
        editedCommentId: child.EDITED_COMMENT_ID,
        headerId: child.HEADER_ID,
        tailId: child.TAIL_ID,
        hashedUser: child.HASHED_USER_IP,
      })),
    }));

    res.status(200).json({
      page,
      limit,
      totalCount,
      data: mappedComments,
    });
  } catch (error) {
    console.error('getCommentsController 오류:', error);
    res.status(500).json({ error: (error as Error).message });
  }
}