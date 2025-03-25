// src/components/Header.tsx
import React from 'react';
import styles from './Header.module.css';

interface SectionRefs {
  about: React.RefObject<HTMLElement>;
  skills: React.RefObject<HTMLElement>;
  certificate: React.RefObject<HTMLElement>;
  apps: React.RefObject<HTMLElement>;
  comments: React.RefObject<HTMLElement>;
  contact: React.RefObject<HTMLElement>;
}

interface HeaderProps {
  sectionRefs: SectionRefs;
}

const Header: React.FC<HeaderProps> = ({ sectionRefs }) => {
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>{/* 로고 영역 */}</div>
        <nav className={styles.navLinks}>
          <a onClick={() => scrollToSection(sectionRefs.about)} className={styles.navLink}>
            About
          </a>
          <a onClick={() => scrollToSection(sectionRefs.skills)} className={styles.navLink}>
            Skills
          </a>
          <a onClick={() => scrollToSection(sectionRefs.certificate)} className={styles.navLink}>
            Certificates
          </a>
          <a onClick={() => scrollToSection(sectionRefs.apps)} className={styles.navLink}>
            Apps
          </a>
          <a onClick={() => scrollToSection(sectionRefs.comments)} className={styles.navLink}>
            Comments/Feedback
          </a>
          <a onClick={() => scrollToSection(sectionRefs.contact)} className={styles.navLink}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
