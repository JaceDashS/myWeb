// server/src/utils/hashUtils.test.ts
import { getHashedIP } from './hashUtils';

describe('getHashedIP', () => {
  test('같은 IP에 대해 같은 해시값을 생성해야 한다.', () => {
    const ip = '192.168.0.1';
    const hash1 = getHashedIP(ip);
    const hash2 = getHashedIP(ip);
    console.log(`[TEST] IP: ${ip} -> Hashed: ${hash1}`);
    expect(hash1).toBe(hash2);
  });

  test('다른 IP에 대해 다른 해시값을 생성해야 한다.', () => {
    const ip1 = '192.168.0.1';
    const ip2 = '192.168.0.2';
    const hash1 = getHashedIP(ip1);
    const hash2 = getHashedIP(ip2);
    console.log(`[TEST] IP1: ${ip1} -> Hashed: ${hash1}`);
    console.log(`[TEST] IP2: ${ip2} -> Hashed: ${hash2}`);
    expect(hash1).not.toBe(hash2);
  });

  test('해시 값의 길이는 16이어야 한다.', () => {
    const ip = '127.0.0.1';
    const hash = getHashedIP(ip);
    console.log(`[TEST] IP: ${ip} -> Hashed: ${hash}`);
    expect(hash.length).toBe(16);
  });

  test('빈 문자열을 입력하면 해시 값도 일정해야 한다.', () => {
    const hash = getHashedIP('');
    console.log(`[TEST] Empty String -> Hashed: ${hash}`);
    expect(hash).toHaveLength(16);
  });
});
