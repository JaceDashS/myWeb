// client/src/pages/Skills.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Skills.module.css";

interface Skill {
    title: string;
    level: number;
    description: string;
}

const skillsData: { [category: string]: Skill[] } = {
    "Programming Languages": [
        {
            title: "C",
            level: 6.5,
            description: "Multi-threading and signal handling with system-level programming.",
        },
        {
            title: "Java",
            level: 7,
            description: "Experience with object-oriented programming and developing game assistant tools.",
        },
        {
            title: "JavaScript",
            level: 7,
            description: "Skilled in building frontend applications using modern frameworks.",
        },
        {
            title: "TypeScript",
            level: 6.5,
            description:
                "Strong experience with typed JavaScript for scalable web apps, including this TSX-based webpage.",
        },
        {
            title: "Python",
            level: 6,
            description: "Basic knowledge in data analysis and machine learning.",
        },
    ],
    "Web Technologies": [
        {
            title: "HTML & CSS",
            level: 8,
            description: "Experienced in creating accessible and responsive web designs.",
        },
        {
            title: "React",
            level: 8,
            description: "Advanced in building dynamic and interactive user interfaces.",
        },
    ],
    "Backend Frameworks": [
        {
            title: "Go",
            level: 5,
            description: "Experienced in developing a Bitcoin-based decentralized application.",
        },
        {
            title: "Express",
            level: 6,
            description: "Experienced in developing RESTful APIs and managing sessions efficiently.",
        },
        {
            title: "MongoDB",
            level: 8,
            description: "Skilled in database modeling and efficient querying.",
        },
    ],
    "Cloud Services": [
        {
            title: "AWS",
            level: 2,
            description: "Hosting and deploying applications using AWS services such as EC2, S3, and ECS.",
        },
        {
            title: "OCI",
            level: 1,
            description:
                "Implemented comments and feedback system using Oracle Cloud Infrastructure (OCI).",
        },
    ],
    Languages: [
        {
            title: "Korean",
            level: 10,
            description: "Native fluency.",
        },
        {
            title: "English",
            level: 8.5,
            description: "Fluent in written and spoken communication.",
        },
        {
            title: "Japanese",
            level: 8,
            description: "Fluent and certified in written and spoken Japanese.",
        },
    ],
    Others: [
        {
            title: "Guitar",
            level: 7,
            description: "",
        },
        {
            title: "Music Production",
            level: 4,
            description: "",
        },
    ],
};

const Skills: React.FC = () => {
    return (
        <div>
            <Header />
            <main className={styles.skillsContainer}>
                <h1 className={styles.pageTitle}>My Skills</h1>
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category} className={styles.categorySection}>
                        <h2 className={styles.categoryTitle}>{category}</h2>
                        <div className={styles.skillsSection}>
                            {skills.map((skill) => (
                                <div key={skill.title} className={styles.skillCard}>
                                    <div className={styles.progressCircle}>
                                        <svg className={styles.circleSvg} viewBox="0 0 36 36">
                                            {/* 배경 원 */}
                                            <path
                                                className={styles.circleBg}
                                                d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            {/* 진행도 원 */}
                                            <path
                                                className={styles.circle}
                                                strokeDasharray={`${skill.level * 10}, 100`}
                                                d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            {/* 중앙 퍼센트 표시 */}
                                            <text
                                                x="16.8"
                                                y="21.3"
                                                className={styles.percentageText}
                                                transform="rotate(90 18 20.35)"
                                            >
                                                {skill.level * 10}%
                                            </text>
                                        </svg>
                                    </div>
                                    <h4 className={styles.skillTitle}>{skill.title}</h4>
                                    <p className={styles.skillDescription}>{skill.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    );
};

export default Skills;
