// server/src/models/comment.ts
export interface Comment {
    id: number;                 // 고유 아이디
    hashedUserIP: string;       // IP 기반 해싱된 유저명
    hashedPassword: string;     // 해싱된 비밀번호
    parentHeaderId?: number | null;   // 부모댓글 아이디 (없으면 루트 댓글)
    content: string | null;     // 댓글 내용 (삭제 시 null)
    createdAt: Date;
    updatedAt: Date;
    isEdited: number;           // 0: 수정 안 됨, 1: 수정됨
    isDeleted: number;          // 0: 삭제 안 됨, 1: 삭제됨
    version: number;            // 버전 (1부터 시작)
    editedCommentId?: number | null;
    headerId: number;           // 자신의 ID == headerId이면 체인의 헤더
    tailId: number;             // 자신의 ID == tailId이면 체인의 테일
}
