// server/src/utils/hashUtils.ts
import crypto from 'crypto';

/**
 * IP를 해싱하여 hashedUserIP를 생성
 */
export function getHashedIP(ip: string): string {
    return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 8);
}
