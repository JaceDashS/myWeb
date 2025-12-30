import { Request } from 'express';

/**
 * 클라이언트의 실제 IP를 가져오는 함수
 * - `X-Forwarded-For` 헤더가 있는 경우 첫 번째 IP를 반환
 * - 없으면 `req.socket.remoteAddress` 사용
 * - IPv6 맵핑된 IPv4 주소(::ffff:127.0.0.1)를 IPv4로 변환
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  let ip: string;

  if (Array.isArray(forwarded)) {
    ip = forwarded[0]; // 첫 번째 IP 사용
  } else if (typeof forwarded === 'string') {
    ip = forwarded.split(',')[0].trim(); // 첫 번째 IP 추출
  } else {
    ip = req.socket.remoteAddress || '0.0.0.0';
  }

  // IPv6 맵핑된 IPv4 주소를 IPv4로 변환 (::ffff:127.0.0.1 -> 127.0.0.1)
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  
  // IPv6 localhost를 IPv4 localhost로 변환
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  return ip;
}
