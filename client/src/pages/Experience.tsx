// src/pages/Experience.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Experience.module.css";

const Experience: React.FC = () => {
  return (
    <div className={styles.experiencePage}>
      <main className={styles.experienceContainer}>
        <h1 className={styles.pageTitle}>Work Experience</h1>
        <div className={styles.experienceSection}>
          {/* Military Manpower Administration Experience */}
          <div className={styles.experienceItem}>
            <h2 className={styles.experienceTitle}>Military Manpower Administration</h2>
            <p className={styles.experienceRole}>National Service Conscript</p>
            <p className={styles.experienceDuration}>December 2019 – September 2021</p>
            <p className={styles.experienceDescription}>
              Fulfilled national service, showcasing discipline, teamwork, and leadership skills while supporting operations for the Military Manpower Administration.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
