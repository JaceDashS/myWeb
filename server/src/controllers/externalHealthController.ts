// server/src/controllers/externalHealthController.ts
import { Request, Response } from 'express';
import { getServiceConfigs, getServiceUrl, EXTERNAL_HEALTH_TIMEOUT } from '../config/constants';
import axios from 'axios';
import { getClientIP } from '../utils/requestUtils';

/**
 * 특정 외부 서비스의 헬스체크
 */
export async function getServiceHealthController(req: Request, res: Response): Promise<void> {
  const { service } = req.params;
  const serviceUrl = getServiceUrl(service);
  const clientIp = getClientIP(req);

  if (!serviceUrl) {
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl || req.path} -> 404 | IP: ${clientIp}`);
    res.status(404).json({
      error: 'Service not found',
      service,
    });
    return;
  }

  try {
    const healthUrl = `${serviceUrl}/health`;
    const response = await axios.get(healthUrl, {
      timeout: EXTERNAL_HEALTH_TIMEOUT,
    });

    console.log(`[GATEWAY] ${req.method} ${req.originalUrl || req.path} -> 200 | IP: ${clientIp}`);
    res.status(200).json({
      service,
      status: 'healthy',
      url: serviceUrl,
      response: response.data,
    });
  } catch (error: any) {
    const statusCode = error.response?.status || 503;
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl || req.path} -> ${statusCode} | IP: ${clientIp}`);
    res.status(statusCode).json({
      service,
      status: 'unhealthy',
      url: serviceUrl,
      error: error.message,
    });
  }
}

/**
 * 모든 외부 서비스의 헬스체크
 */
export async function getAllServicesHealthController(req: Request, res: Response): Promise<void> {
  const clientIp = getClientIP(req);

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:52',message:'getAllServicesHealthController entry',data:{clientIp,originalUrl:req.originalUrl,path:req.path,method:req.method},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // Debug: Log environment variables
  const envKeys = Object.keys(process.env).filter(k => k.startsWith('EXTERNAL_SERVICE_'));
  console.log(`[EXTERNAL_HEALTH] Environment check - Found ${envKeys.length} EXTERNAL_SERVICE_* keys:`, envKeys);
  
  const services = getServiceConfigs();
  console.log(`[EXTERNAL_HEALTH] Services found: ${services.length}`, services.map(s => ({ name: s.name, url: s.url })));

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:59',message:'Services retrieved',data:{serviceCount:services.length,services:services.map(s=>({name:s.name,url:s.url})),nodeEnv:process.env.NODE_ENV,envKeys},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:65',message:'Starting health checks',data:{serviceCount:services.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  const healthChecks = await Promise.allSettled(
    services.map(async (service) => {
      const healthUrl = `${service.url}/health`;
      const startTime = Date.now();
      
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:72',message:'Before axios request',data:{serviceName:service.name,healthUrl,timeout:EXTERNAL_HEALTH_TIMEOUT,serviceUrl:service.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion

      try {
        const response = await axios.get(healthUrl, {
          timeout: EXTERNAL_HEALTH_TIMEOUT,
          validateStatus: () => true, // 모든 상태 코드 허용
        });
        const duration = Date.now() - startTime;

        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:81',message:'Axios request success',data:{serviceName:service.name,status:response.status,statusText:response.statusText,duration,hasData:!!response.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion

        return {
          name: service.name,
          url: service.url,
          status: 'healthy',
          response: response.data, // 외부 서비스의 헬스체크 응답을 그대로 포함
        };
      } catch (error: any) {
        const duration = Date.now() - startTime;
        const errorDetails = {
          message: error.message,
          code: error.code,
          errno: error.errno,
          syscall: error.syscall,
          hostname: error.hostname,
          address: error.address,
          port: error.port,
          responseStatus: error.response?.status,
          responseData: error.response?.data,
          isTimeout: error.code === 'ECONNABORTED' || error.message?.includes('timeout'),
          isNetworkError: error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT',
        };

        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:97',message:'Axios request error',data:{serviceName:service.name,healthUrl,duration,...errorDetails},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion

        return {
          name: service.name,
          url: service.url,
          status: 'unhealthy',
          error: error.message,
        };
      }
    })
  );

  const results = healthChecks.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        name: services[index].name,
        url: services[index].url,
        status: 'error',
        error: result.reason?.message || 'Unknown error',
      };
    }
  });

  const allHealthy = results.every((r) => r.status === 'healthy');
  const statusCode = allHealthy ? 200 : 503;

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'externalHealthController.ts:120',message:'Health check complete',data:{statusCode,allHealthy,resultCount:results.length,results:results.map(r=>({name:r.name,status:r.status}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  console.log(`[GATEWAY] ${req.method} ${req.originalUrl || req.path} -> ${statusCode} | IP: ${clientIp}`);
  res.status(statusCode).json({
    gateway: 'healthy',
    services: results, // services 배열 안에 response가 그대로 포함됨
    timestamp: new Date().toISOString(),
  });
}

