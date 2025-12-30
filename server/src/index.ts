// server/src/index.ts
import express, { Request, Response } from 'express';
import axios from "axios";
import cors from 'cors';
import commentRoutes from './routes/commentRoutes';
import appRoutes from './routes/appRoutes';
import gptVisualizerRoutes from './routes/gptVisualizerRoutes';
import externalHealthRoutes from './routes/externalHealthRoutes';
import { initCommentsTable, initAppsTable } from './utils/db';
import { errorHandler } from './handlers/errorHandler';
import { getClientIP } from './utils/requestUtils';

const app = express();
const PORT = parseInt(process.env.SERVER_PORT || '3000', 10);

// CORS 활성화
if (process.env.CORS_MODE === 'dev') {
  app.use(cors());                                   // 모든 오리진 허용
} else {
  // 기본 허용 오리진
  const allowedOrigins: string[] = ['https://www.jace-s.com', 'https://jace-s.com'];
  
  // 환경변수에서 추가 오리진 읽기 (콤마로 구분)
  const additionalOrigins = process.env.ALLOWED_ORIGINS;
  if (additionalOrigins) {
    const origins = additionalOrigins.split(',').map(origin => origin.trim()).filter(origin => origin);
    allowedOrigins.push(...origins);
  }
  
  // GPT Visualizer 클라이언트 URL 추가
  const gptVisualizerClient = process.env.GPT_VISUALIZER_CLIENT;
  if (gptVisualizerClient) {
    const clientUrls = gptVisualizerClient.split(',').map(url => url.trim()).filter(url => url);
    allowedOrigins.push(...clientUrls);
  }
  
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    }),
  );                                                 // 배포 화이트리스트
}
app.options('*', cors()); 
app.use(express.json());

// DB 초기화, 필요 시 주석 해제
// **매우 신중하게 사용할 것. 테이블 초기화는 한 번만 해야 함. 이중주석 해제 시 데이터 손실 발생!** 
// // initCommentsTable();  // COMMENTS 테이블만 초기화
// // initAppsTable();      // APPS 테이블만 초기화

// 라우트 등록
// 내부 API 라우트 (우선순위 높음)
app.use('/comments', commentRoutes);
app.use('/apps', appRoutes);
app.use('/gptvisualizer', gptVisualizerRoutes);

// 외부 서비스 헬스체크
app.use('/external', externalHealthRoutes);

app.get('/health', (req, res) => {
  const isDev = process.env.CORS_MODE === 'dev';
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  res.status(200).json({
    status: 'OK',
    mode: isDev ? 'dev' : 'production',
    nodeEnv: nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// 기본 라우트 설정
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
  console.log('Server is running');
});

// /ip 라우트: 클라이언트 IP와 서버의 공인 IP 반환
app.get("/ip", async (req, res) => {
  // 클라이언트 IP 확인 (프록시 사용하는 경우 적절한 설정 필요)
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
  try {
    // ipify API를 통해 서버의 공인 IP 조회
    const response = await axios.get("https://api.ipify.org?format=json");
    const serverIp = response.data.ip;
    res.json({
      message: "OK",
      clientIp: clientIp,
      serverPublicIp: serverIp,
    });
  } catch (error) {
    console.error("서버의 공인 IP 조회 실패:", error);
    res.status(500).json({ message: "서버의 공인 IP 조회 실패" });
  }
});

// 에러 핸들러
app.use(errorHandler);

// 서버 실행
const HOST = process.env.SERVER_HOST || '0.0.0.0';
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  //db 연결 종료 등 필요한 정리 작업 수행
  server.close(() => {
    console.log('HTTP server closed')
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('HTTP server closed')
  })
}) 
