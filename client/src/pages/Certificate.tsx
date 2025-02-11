// src/pages/certificate.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Certificate.module.css";

const Certificate: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={styles.certificateContainer}>
        <h1 className={styles.pageTitle}>Certificates</h1>
        <div className={styles.certificateSection}>
          <p className={styles.placeholderText}>
            Your certifications will be displayed here.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Certificate;
