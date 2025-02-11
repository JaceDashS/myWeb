# server/Dockerfile

# Node.js 서버 애플리케이션 실행
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install && apk --no-cache add curl

# 서버 코드 복사
COPY . ./

# 포트 노출 (내부 네트워크에서만 접근)
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]