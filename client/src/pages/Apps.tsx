// src/pages/Apps.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Apps.module.css";

interface App {
  title: string;
  description: string;
  image: string;
  path?: string; // 페이지 이동 경로 (선택)
  apkUrl?: string; // APK 다운로드 링크 (선택)
  iosUrl?: string; // iOS 다운로드 링크 (선택)
}

const appsData: App[] = [
  {
    title: "스쿼트 밸런서",
    description: "A service for optimizing your squat posture.",
    image: "/images/squat-balancer.png",
    path: "/apps/squat-balancer", // 추가된 경로
    apkUrl: "https://my-apps-storage.s3.amazonaws.com/squat-balancer.apk", // APK 다운로드 링크 (예제)
    iosUrl: "https://my-apps-storage.s3.amazonaws.com/squat-balancer.ipa", // iOS 다운로드 링크 (예제)
  },
  // {
  //   title: "App Three",
  //   description: "A cutting-edge tool for enhancing your productivity.",
  //   image: "/images/app3.png",
  //   apkUrl: "https://my-apps-storage.s3.amazonaws.com/app-three.apk", // APK 다운로드 링크 (예제)
  //   iosUrl: "https://my-apps-storage.s3.amazonaws.com/app-three.ipa", // iOS 다운로드 링크 (예제)
  // }
];

const Apps: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  return (
    <div>
      <Header />
      <main className={styles.appsContainer}>
        <h1 className={styles.pageTitle}>My Applications</h1>
        <div className={styles.appsTable}>
          {appsData.map((app, index) => (
            <div key={index} className={styles.appRow}>
              <div
                className={styles.appContent}
                onClick={() => app.path && navigate(app.path)}
                style={app.path ? { cursor: "pointer" } : {}}
              >
                <div className={styles.appIcon}>
                  <img src={app.image} alt={`${app.title} icon`} />
                </div>
                <div className={styles.appDescription}>
                  <h2 className={styles.appTitle}>{app.title}</h2>
                  <p className={styles.appText}>{app.description}</p>
                </div>
              </div>
              <div className={styles.downloadButtons}>
                {app.apkUrl && (
                  <a className={styles.downloadButton} href={app.apkUrl} download>
                    📥 Download APK
                  </a>
                )}
                {app.iosUrl && (
                  <a className={styles.downloadButton} href={app.iosUrl} download>
                    🍏 Download iOS (IPA)
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apps;
