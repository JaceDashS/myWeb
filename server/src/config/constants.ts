// server/src/config/constants.ts

/**
 * 서비스 및 타임아웃 관련 상수 설정
 */

// ==================== 타임아웃 상수 ====================
/**
 * 게이트웨이 최대 리다이렉트 횟수
 */
export const GATEWAY_MAX_REDIRECTS = 3;

/**
 * 외부 서비스 헬스체크 타임아웃 (밀리초)
 * 30초 = 30000ms
 */
export const EXTERNAL_HEALTH_TIMEOUT = 30000;

/**
 * GPT Visualizer 타임아웃 (밀리초)
 * 30초 = 30000ms
 */
export const GPT_VISUALIZER_TIMEOUT = 30000;

// ==================== 서비스 설정 ====================

/**
 * 외부 서비스 설정
 * 환경변수에서 외부 서비스 URL을 읽어옵니다.
 */

export interface ServiceConfig {
  name: string;
  url: string;
  enabled: boolean;
}

/**
 * 환경변수에서 서비스 URL을 읽어옵니다.
 * 형식: EXTERNAL_SERVICE_{SERVICE_NAME}_URL
 */
export function getServiceConfigs(): ServiceConfig[] {
  const services: ServiceConfig[] = [];
  const prefix = 'EXTERNAL_SERVICE_';
  const suffix = '_URL';

  // #region agent log
  const allEnvKeys = Object.keys(process.env);
  const matchingKeys = allEnvKeys.filter(k=>k.startsWith(prefix));
  console.log(`[SERVICES_CONFIG] getServiceConfigs called - Total env keys: ${allEnvKeys.length}, Matching keys: ${matchingKeys.length}`, matchingKeys);
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'services.ts:18',message:'getServiceConfigs called',data:{totalEnvKeys:allEnvKeys.length,matchingKeys,prefix,suffix,nodeEnv:process.env.NODE_ENV},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // 환경변수에서 EXTERNAL_SERVICE_*_URL 패턴 찾기
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      // EXTERNAL_SERVICE_GPT_VISUALIZER_URL -> gpt-visualizer
      const serviceName = key
        .slice(prefix.length, -suffix.length)
        .toLowerCase()
        .replace(/_/g, '-'); // 언더스코어를 하이픈으로 변환

      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'services.ts:32',message:'Found service env var',data:{key,serviceName,url:value?.trim(),hasValue:!!value,valueLength:value?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      if (value && value.trim()) {
        services.push({
          name: serviceName,
          url: value.trim(),
          enabled: true,
        });
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'services.ts:44',message:'Service env var empty or invalid',data:{key,serviceName,value},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
      }
    }
  }

  // #region agent log
  console.log(`[SERVICES_CONFIG] getServiceConfigs result - Found ${services.length} services`);
  fetch('http://127.0.0.1:7244/ingest/06cfb5ce-213f-43f1-9ec7-bfcf267bfd0b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'services.ts:52',message:'getServiceConfigs result',data:{serviceCount:services.length,services:services.map(s=>({name:s.name,url:s.url}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return services;
}

/**
 * 특정 서비스의 URL을 가져옵니다.
 * @param serviceName 서비스 이름 (예: 'gpt-visualizer' 또는 'gpt_visualizer')
 */
export function getServiceUrl(serviceName: string): string | null {
  // 하이픈을 언더스코어로 변환하여 환경변수 키 생성
  const envKey = `EXTERNAL_SERVICE_${serviceName.toUpperCase().replace(/-/g, '_')}_URL`;
  const url = process.env[envKey];
  return url && url.trim() ? url.trim() : null;
}

