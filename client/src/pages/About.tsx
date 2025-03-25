// client/src/pages/About.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './About.module.css';

const About: React.FC = () => {
    return (
        <div>
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
                        I'm currently finishing my Bachelor of Science in Computer Science at Stony Brook University, with a specialization in Artificial Intelligence and Data Science. I’m expected to graduate in May 2025.
                        <br></br>
                        Being fluent in English, Korean, and Japanese allows me to access a wide range of technical resources, documentation, and communities across different languages. This gives me a unique advantage in learning new technologies faster and more effectively than others.
                        <br></br>
                        Driven by curiosity, I’m always eager to explore emerging tools and frameworks that push the boundaries of what technology can do.
                        <br></br>
                        Outside of tech, I enjoy staying active and expressing myself through music. I mainly play the guitar, have studied music theory, and composed several original pieces.
                        
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
