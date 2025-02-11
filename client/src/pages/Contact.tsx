// src/pages/contact.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={styles.contactContainer}>
        <h1 className={styles.pageTitle}>Contact</h1>
        <div className={styles.contactSection}>
          <p className={styles.contactItem}>
            <FaPhone className={styles.contactIcon} />
            <strong> Phone: </strong>
            <a href="tel:8452904720" className={styles.contactLink}>
              845-290-4720
            </a>
          </p>
          <p className={styles.contactItem}>
            <FaEnvelope className={styles.contactIcon} />
            <strong> Email: </strong>
            <a
              href="mailto:jungsoo.shin0827@gmail.com"
              className={styles.contactLink}
            >
              jungsoo.shin0827@gmail.com
            </a>
          </p>
          <p className={styles.contactItem}>
            <FaLinkedin className={styles.contactIcon} />
            <strong> LinkedIn: </strong>
            <a
              href="https://www.linkedin.com/in/jungsoo-shin-28779a238"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              linkedin.com/in/jungsoo-shin-28779a238
            </a>
          </p>
          <p className={styles.contactItem}>
            <FaInstagram className={styles.contactIcon} />
            <strong> Instagram: </strong>
            <a
              href="https://www.instagram.com/uiorewq9950/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              instagram.com/uiorewq9950
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
