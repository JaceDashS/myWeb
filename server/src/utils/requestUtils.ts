import { Request } from 'express';

/**
 * 클라이언트의 실제 IP를 가져오는 함수
 * - `X-Forwarded-For` 헤더가 있는 경우 첫 번째 IP를 반환
 * - 없으면 `req.socket.remoteAddress` 사용
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];

  if (Array.isArray(forwarded)) {
    return forwarded[0]; // 첫 번째 IP 사용
  } else if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim(); // 첫 번째 IP 추출
  }

  return req.socket.remoteAddress || '0.0.0.0';
}
