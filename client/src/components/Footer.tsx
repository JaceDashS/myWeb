// src/components/Footer.tsx
import React from "react";
import {
  FaInstagram,
  //  FaLinkedin, 
  //  FaYoutube, 
  FaGithub
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <p className={styles.footerText}>© 2025 Jung Soo Shin | Hosted on AWS</p>
      <div className={styles.socialIcons}>
        <a
          href="https://www.instagram.com/uiorewq9950/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className={styles.socialIcon} />
        </a>
        {/* <a
          href="https://www.linkedin.com/in/jungsoo-shin-28779a238"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className={styles.socialIcon} />
        </a> */}
        {/* <a
          href="https://www.youtube.com/@Iamnotapro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <FaYoutube className={styles.socialIcon} />
        </a> */}
        <a
          href="https://github.com/Jace0827"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className={styles.socialIcon} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
