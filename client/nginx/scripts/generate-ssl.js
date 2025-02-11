// scripts/generate-ssl.js

const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');

// SSL 인증서를 저장할 디렉토리
const SSL_DIR = path.join(__dirname, '../ssl');

// 디렉토리가 없으면 생성
if (!fs.existsSync(SSL_DIR)) {
  fs.mkdirSync(SSL_DIR, { recursive: true });
  console.log(`✅ SSL 디렉토리를 생성했습니다: ${SSL_DIR}`);
}

// 인증서와 키 파일 경로
const KEY_FILE = path.join(SSL_DIR, 'nginx.key');
const CERT_FILE = path.join(SSL_DIR, 'nginx.crt');

// 인증서와 키 파일 생성 옵션
const attrs = [{ name: 'commonName', value: 'localhost' }];
const options = {
  days: 365,
  keySize: 2048, // 키 크기를 2048비트로 설정
  algorithm: 'sha256', // 해시 알고리즘 설정
};

// 인증서와 키 파일 생성
const pems = selfsigned.generate(attrs, options);

// 파일 쓰기
fs.writeFileSync(KEY_FILE, pems.private);
fs.writeFileSync(CERT_FILE, pems.cert);

console.log('✅ SSL 인증서와 키 파일을 생성했습니다:');
console.log(`   - ${KEY_FILE}`);
console.log(`   - ${CERT_FILE}`);
