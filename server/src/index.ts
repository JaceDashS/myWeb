// server/src/index.ts
import express, { Request, Response } from 'express';
import axios from "axios";
import cors from 'cors';
import commentRoutes from './routes/commentRoutes';
import { initDB } from './utils/db';
import { errorHandler } from './handlers/errorHandler';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// CORS 활성화
if (process.env.CORS_MODE === 'dev') {
  app.use(cors());                                   // 모든 오리진 허용
} else {
  app.use(
    cors({
      origin: ['https://www.jace-s.com', 'https://jace-s.com'],
      credentials: true,
    }),
  );                                                 // 배포 화이트리스트
}
app.options('*', cors()); 
app.use(express.json());

// DB 초기화, 필요 시 주석 해제
// initializeDatabase();

// 라우트 등록
app.use('/comments', commentRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK\n'); // 정상 동작 시 200 응답
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
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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

// DB 초기화 함수
async function initializeDatabase(): Promise<void> {
  try {
    await initDB();
    console.log('DB 초기화 완료');
  } catch (err) {
    console.error('DB 초기화 실패:', err);
    process.exit(1);
  }
}