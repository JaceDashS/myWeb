// src/pages/Apps.tsx
import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "./Apps.module.css";
import { FaAndroid, FaGlobe, FaPlay } from "react-icons/fa";

interface App {
  title: string;
  description: string;
  image: string;
  apkUrl?: string;
  webUrl?: string;
  demoUrl?: string;
}

const appsData: App[] = [
  {
    title: "Squat Balancer",
    description: "A service for optimizing your squat posture.",
    image: "/images/Squat-Balancer.png",
    apkUrl: "https://s3.us-east-1.amazonaws.com/cdn.jace-s.com/squat-balancer.apk",
    webUrl: "https://squat-balancer.netlify.app/",
    demoUrl: "https://www.youtube.com/watch?v=-wBZ6eyQMms", // Demo URL (현재는 YouTube URL로 연결)
  },
  {
    title: "Transformer Attention Visualizer",
    description: "User friendly attention visualizer",
    image: "/images/Transformer-Attention-Visualizer.png",
    webUrl: "https://bert-attention-visualizer.vercel.app/",
  },
];

const Apps: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div>
      {/* Header 제거 */}
      <main className={styles.appsContainer}>
        <h1 className={styles.pageTitle}>My Applications</h1>
        <div className={styles.appsTable}>
          {appsData.map((app, index) => (
            <React.Fragment key={index}>
              <div
                className={styles.appRow}
                style={{
                  pointerEvents: "none", // 전체 행은 포인터 이벤트 차단 (hover 반응 없음)
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {/* 왼쪽 이미지 */}
                <div className={styles.appIcon} style={{ marginRight: "1rem" }}>
                  <img
                    src={app.image}
                    alt={`${app.title} icon`}
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>
                {/* 중앙 설명 (클릭 이벤트 제거) */}
                <div className={styles.appContent} style={{ flexGrow: 1 }}>
                  <h2 className={styles.appTitle}>{app.title}</h2>
                  <p className={styles.appText}>{app.description}</p>
                </div>
                {/* 오른쪽 버튼 그룹 - 버튼들만 pointerEvents 활성화 */}
                <div
                  className={styles.downloadButtons}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginLeft: "auto",
                  }}
                >
                  {app.apkUrl && (
                    <a
                      style={{ pointerEvents: "auto" }}
                      className={styles.downloadButton}
                      href={app.apkUrl}
                      download
                    >
                      <FaAndroid size={20} style={{ verticalAlign: "middle" }} /> APK
                    </a>
                  )}
                  {app.webUrl && (
                    <a
                      style={{ pointerEvents: "auto" }}
                      className={styles.downloadButton}
                      href={app.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGlobe size={20} style={{ verticalAlign: "middle" }} /> Web
                    </a>
                  )}
                  {app.demoUrl && (
                    <button
                      style={{ pointerEvents: "auto" }}
                      className={styles.downloadButton}
                      onClick={() => setShowDemo(!showDemo)}
                    >
                      <FaPlay size={20} style={{ verticalAlign: "middle" }} /> Demo
                    </button>
                  )}
                </div>
              </div>
              {/* Squat Balancer 항목 바로 아래에 데모 렌더링 */}
              {app.title === "Squat Balancer" && showDemo && (
                <div className={styles.demoContainer} style={{ marginBottom: "1rem" }}>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/-wBZ6eyQMms?autoplay=1"
                    title="Demo video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apps;
