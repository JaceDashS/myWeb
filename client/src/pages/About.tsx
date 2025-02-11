// client/src/pages/About.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './About.module.css';

const About: React.FC = () => {
    return (
        <div>
            <Header />
            <main className={styles.aboutContainer}>
                <aside className={styles.aboutSidebar}>
                    <img
                        src="/images/profile.jpg"
                        alt="Profile"
                        className={styles.profilePicture}
                    />
                    <div>
                        <h2 className={styles.infoSectionName}>Jung soo Shin</h2>
                        <img
                            src="/images/sbu_logo.png"
                            alt="Stony Brook University Logo"
                            className={styles.titleImage}
                        />
                    </div>
                    <p className={styles.location}>Stony Brook, NY</p>
                    <p className={styles.degree}>Bachelor of Science in Computer Science</p>
                    <p className={styles.specialization}>
                        Specialization in Artificial Intelligence and Data Science
                    </p>
                </aside>
                <section className={styles.aboutContent}>
                    {/* 상단 소개 */}
                    <h2 className={styles.role}>Junior Developer</h2>
                    <h1 className={styles.aboutMainName}>Jung soo Shin</h1>
                    <h3 className={styles.sectionTitle}>Description</h3>
                    <p className={styles.aboutDescription}>
                        I am a developer fluent in English, Korean, and Japanese. I enjoy learning new technologies and continuously expanding my skill set. With a strong emphasis on collaborative problem-solving and efficient version control, I thrive in dynamic team environments. My deep appreciation for music enhances my creativity, while my passion for fitness keeps me disciplined and driven. Always eager to explore emerging technologies, I strive to craft innovative solutions that create meaningful impact.
                    </p>
                    {/* 하단 카드 섹션 (필요 시 주석 해제) */}
                    {/*
          <div className={styles.skillsSection}>
            <div className={styles.skillCard}>
              <div className={styles.progressCircle}>
                <span className={styles.percentage}>75%</span>
              </div>
              <h4 className={styles.skillTitle}>INTUITION</h4>
              <p className={styles.skillDescription}>Etiam nec odio vestibulum est.</p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.progressCircle}>
                <span className={styles.percentage}>83%</span>
              </div>
              <h4 className={styles.skillTitle}>CREATIVITY</h4>
              <p className={styles.skillDescription}>Odio vestibulum est mattis.</p>
            </div>
          </div>
          */}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
