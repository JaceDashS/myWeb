// server/src/routes/gptVisualizerRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { getClientIP } from '../utils/requestUtils';
import { getServiceUrl, GPT_VISUALIZER_TIMEOUT } from '../config/constants';
import axios from 'axios';

const router = Router();

const externalServiceUrl = getServiceUrl('gpt-visualizer');

// 직접 axios를 사용한 프록시 핸들러
async function proxyHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!externalServiceUrl) {
    res.status(503).json({ error: 'Service unavailable', message: 'gpt-visualizer URL not configured' });
    return;
  }

  const clientIp = getClientIP(req);
  const targetUrl = `${externalServiceUrl}/api/visualize`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'X-Forwarded-For': clientIp,
        'X-Original-Host': req.headers.host || '',
        'X-Forwarded-Proto': req.protocol || 'http',
      },
      timeout: GPT_VISUALIZER_TIMEOUT,
      validateStatus: () => true, // 모든 상태 코드 허용
    });

    // 응답 헤더 복사 (문제가 될 수 있는 헤더 제외)
    const excludedHeaders = ['content-encoding', 'transfer-encoding', 'content-length', 'connection'];
    Object.keys(response.headers).forEach(key => {
      const lowerKey = key.toLowerCase();
      if (!excludedHeaders.includes(lowerKey)) {
        const headerValue = response.headers[key];
        if (headerValue && typeof headerValue === 'string') {
          res.setHeader(key, headerValue);
        } else if (Array.isArray(headerValue) && headerValue.length > 0) {
          res.setHeader(key, headerValue[0]);
        }
      }
    });

    console.log(`[GPT Visualizer] ${req.method} ${req.originalUrl || req.path} -> ${response.status} | IP: ${clientIp}`);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(`[GPT Visualizer] ❌ ${req.method} ${req.originalUrl || req.path} | Error: ${error.message} | IP: ${clientIp}`);
    res.status(502).json({
      error: 'Bad Gateway',
      message: error.message,
      path: req.path,
    });
  }
}

if (externalServiceUrl) {
  // 요청 추적을 위한 맵
  const requestTracker = new Map<string, number>();
  
  router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'OPTIONS') {
      const clientIp = getClientIP(req);
      const timestamp = Date.now();
      const requestKey = `${clientIp}-${req.path}-${Math.floor(timestamp / 1000)}`;
      const count = (requestTracker.get(requestKey) || 0) + 1;
      requestTracker.set(requestKey, count);
      
      setTimeout(() => requestTracker.delete(requestKey), 1000);
      
      if (count > 1) {
        console.log(`[GPT Visualizer] DUPLICATE REQUEST #${count}: ${req.method} ${req.originalUrl || req.path} | IP: ${clientIp}`);
      }
    }
    next();
  });
  
  router.use('/', proxyHandler);
} else {
  router.use((req: Request, res: Response, next: NextFunction) => {
    console.warn(`[GPT Visualizer] Proxy not available for: ${req.method} ${req.originalUrl || req.path}`);
    res.status(503).json({ error: 'Service unavailable', message: 'gpt-visualizer URL not configured' });
  });
}

export default router;

