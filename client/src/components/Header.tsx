// src/components/Header.tsx
import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
      </div>
      <nav className={styles.navLinks}>
        <a href="/" className={styles.navLink}>
          About
        </a>
        <a href="skills" className={styles.navLink}>
          Skills
        </a>
        <a href="certificate" className={styles.navLink}>
          Certificates
        </a>
        <a href="apps" className={styles.navLink}>
          Apps
        </a>
        <a href="comments" className={styles.navLink}>
          Comments/Feedback
        </a>
        <a href="contact" className={styles.navLink}>
          Contact
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
