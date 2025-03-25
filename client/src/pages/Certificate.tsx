// src/pages/certificate.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Certificate.module.css";

const Certificate: React.FC = () => {
  const [showAWS, setShowAWS] = useState(false);
  const [showJLPT, setShowJLPT] = useState(false);

  const handleAWSClick = () => {
    // AWS 클릭 시, 현재 상태가 켜져있으면 끄고, 아니면 AWS를 켜고 JLPT는 끕니다.
    setShowAWS((prev) => {
      const newVal = !prev;
      if (newVal) setShowJLPT(false);
      return newVal;
    });
  };

  const handleJLPTClick = () => {
    // JLPT 클릭 시, 현재 상태가 켜져있으면 끄고, 아니면 JLPT를 켜고 AWS는 끕니다.
    setShowJLPT((prev) => {
      const newVal = !prev;
      if (newVal) setShowAWS(false);
      return newVal;
    });
  };

  return (
    <div>
      <main className={styles.certificateContainer}>
        <h1 className={styles.pageTitle}>Certificates</h1>
        <div className={styles.certificateCardsContainer}>
          {/* AWS Certified Cloud Practitioner 카드 */}
          <div
            className={styles.certificateCard}
            onClick={handleAWSClick}
          >
            <img
              src="/images/AWS-Certified-Cloud-Practitioner.png"
              alt="AWS Certified Cloud Practitioner"
              className={styles.certificateIcon}
            />
            <p className={styles.certificateLabel}>
              AWS Certified Cloud Practitioner
            </p>
          </div>
          {/* JLPT 카드 */}
          <div
            className={styles.certificateCard}
            onClick={handleJLPTClick}
          >
            <div className={styles.jlptCardText}>JLPT</div>
          </div>
        </div>

        {/* AWS 인증서 상세 내용 (PDF) */}
        {showAWS && (
          <div className={styles.certificateDetails}>
            <object
              data="/images/AWS-Certified-Cloud-Practitioner-certificate.pdf"
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                Your browser does not support PDFs. Please download the PDF{" "}
                <a href="/images/AWS-Certified-Cloud-Practitioner-certificate.pdf">
                  here
                </a>.
              </p>
            </object>
          </div>
        )}

        {/* JLPT 인증서 상세 내용 (두 이미지가 옆에 배치) */}
        {showJLPT && (
          <div className={styles.certificateDetails}>
            <div className={styles.jlptImagesContainer}>
              <img
                src="/images/jlpt_1.jpg"
                alt="JLPT Certificate 1"
                className={styles.jlptImage}
              />
              <img
                src="/images/jlpt_2.jpg"
                alt="JLPT Certificate 2"
                className={styles.jlptImage}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Certificate;
