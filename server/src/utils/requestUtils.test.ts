import { getClientIP } from './requestUtils';
import { Request } from 'express';

describe('getClientIP', () => {
  test('X-Forwarded-For 헤더가 있는 경우 첫 번째 IP를 반환해야 한다.', () => {
    const mockReq = {
      headers: {
        'x-forwarded-for': '203.0.113.195, 192.168.1.1'
      },
      socket: {
        remoteAddress: '10.0.0.1'
      }
    } as unknown as Request;

    const clientIP = getClientIP(mockReq);
    console.log(`[TEST] X-Forwarded-For: ${mockReq.headers['x-forwarded-for']} -> Extracted IP: ${clientIP}`);
    expect(clientIP).toBe('203.0.113.195');
  });

  test('X-Forwarded-For가 배열 형태인 경우 첫 번째 IP를 반환해야 한다.', () => {
    const mockReq = {
      headers: {
        'x-forwarded-for': ['203.0.113.195', '192.168.1.1']
      },
      socket: {
        remoteAddress: '10.0.0.1'
      }
    } as unknown as Request;

    const clientIP = getClientIP(mockReq);
    console.log(`[TEST] X-Forwarded-For Array: ${mockReq.headers['x-forwarded-for']} -> Extracted IP: ${clientIP}`);
    expect(clientIP).toBe('203.0.113.195');
  });

  test('X-Forwarded-For 헤더가 없을 경우 remoteAddress를 반환해야 한다.', () => {
    const mockReq = {
      headers: {},
      socket: {
        remoteAddress: '10.0.0.1'
      }
    } as unknown as Request;

    const clientIP = getClientIP(mockReq);
    console.log(`[TEST] No X-Forwarded-For -> remoteAddress: ${mockReq.socket.remoteAddress} -> Extracted IP: ${clientIP}`);
    expect(clientIP).toBe('10.0.0.1');
  });

  test('X-Forwarded-For와 remoteAddress 둘 다 없을 경우 "0.0.0.0"을 반환해야 한다.', () => {
    const mockReq = {
      headers: {},
      socket: {}
    } as unknown as Request;

    const clientIP = getClientIP(mockReq);
    console.log(`[TEST] No X-Forwarded-For & No remoteAddress -> Extracted IP: ${clientIP}`);
    expect(clientIP).toBe('0.0.0.0');
  });
});
