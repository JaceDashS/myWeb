// src/pages/Skills.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Skills.module.css";
import { FaPlay } from "react-icons/fa";

interface Skill {
  title: string;
  level: number;
  description: string;
  demoUrl?: string;
}

const skillsData: { [category: string]: Skill[] } = {
  "Programming Languages": [
    {
      title: "C",
      level: 6.5,
      description:
        "Multi-threading and signal handling with system-level programming.",
    },
    {
      title: "Java",
      level: 7,
      description:
        "Experience with object-oriented programming and developing game assistant tools.",
    },
    {
      title: "JavaScript",
      level: 7,
      description:
        "Skilled in building frontend applications using modern frameworks.",
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
  "Cloud Services": [
    {
      title: "AWS",
      level: 2,
      description:
        "Hosting and deploying applications using AWS services such as EC2, S3, and ECS.",
    },
    {
      title: "OCI",
      level: 1,
      description:
        "Implemented comments and feedback system using Oracle Cloud Infrastructure (OCI).",
    },
  ],
  "Backend Frameworks": [
    {
      title: "Go",
      level: 5,
      description:
        "Experienced in developing a Bitcoin-based decentralized application.",
    },
    {
      title: "Express",
      level: 6,
      description:
        "Experienced in developing RESTful APIs and managing sessions efficiently.",
    },
    {
      title: "MongoDB",
      level: 8,
      description: "Skilled in database modeling and efficient querying.",
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
      demoUrl: "https://youtu.be/E1NmOPQkScU",
    },
    {
      title: "Music Production",
      level: 4,
      description: "",
      demoUrl: "https://www.youtube.com/watch?v=YkOgEa7yRwo",
    },
  ],
};

// 행별 카테고리 그룹 (Backend Frameworks와 Cloud Services의 위치 교체됨)
const categoryRows = [
  ["Programming Languages"],
  ["Web Technologies", "Cloud Services"],
  ["Backend Frameworks", "Languages"],
  ["Others"],
];

const Skills: React.FC = () => {
  const [openDemos, setOpenDemos] = useState<{ [key: string]: boolean }>({});

  // 유튜브 URL을 embed URL로 변환하는 헬퍼 함수
  const getEmbedUrl = (url: string): string => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div>
      <main className={styles.skillsContainer}>
        <h1 className={styles.pageTitle}>My Skills</h1>
        {categoryRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.categoryRow}>
            {row.map((category) => {
              const skills = skillsData[category];
              const openDemoSkills = skills.filter(
                (skill) => skill.demoUrl && openDemos[skill.title]
              );
              return (
                <div
                  key={category}
                  className={`${styles.categorySection} ${
                    category === "Programming Languages"
                      ? styles.fullWidthCategory
                      : ""
                  }`}
                >
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <div
                    className={`${styles.categoryContainer} ${
                      category === "Programming Languages" ? styles.noWrap : ""
                    }`}
                  >
                    <div className={styles.skillsSection}>
                      {skills.map((skill) => (
                        <div
                          key={skill.title}
                          className={styles.skillCardWrapper}
                        >
                          <div className={styles.skillCard}>
                            <div className={styles.progressCircle}>
                              <svg
                                className={styles.circleSvg}
                                viewBox="0 0 36 36"
                              >
                                <path
                                  className={styles.circleBg}
                                  d="M18 2.0845
                                     a 15.9155 15.9155 0 0 1 0 31.831
                                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className={styles.circle}
                                  strokeDasharray={`${skill.level * 10}, 100`}
                                  d="M18 2.0845
                                     a 15.9155 15.9155 0 0 1 0 31.831
                                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                {/* 퍼센티지 텍스트 위치 약간 조정 */}
                                <text
                                  x="17"
                                  y="21"
                                  className={styles.percentageText}
                                  transform="rotate(90 18 20)"
                                >
                                  {skill.level * 10}%
                                </text>
                              </svg>
                            </div>
                            <h4 className={styles.skillTitle}>{skill.title}</h4>
                            <p className={styles.skillDescription}>
                              {skill.description}
                            </p>
                            {skill.demoUrl && (
                              <button
                                style={{ pointerEvents: "auto" }}
                                className={styles.downloadButton}
                                onClick={() => {
                                  if (category === "Others") {
                                    // Others 카테고리의 경우, 현재 Others 내의 모든 데모 상태를 false로 초기화 후 토글
                                    const newState: { [key: string]: boolean } = {};
                                    skills.forEach((s) => {
                                      newState[s.title] = false;
                                    });
                                    newState[skill.title] = !openDemos[skill.title];
                                    setOpenDemos(newState);
                                  } else {
                                    setOpenDemos({
                                      ...openDemos,
                                      [skill.title]: !openDemos[skill.title],
                                    });
                                  }
                                }}
                              >
                                <FaPlay
                                  size={20}
                                  style={{ verticalAlign: "middle" }}
                                />{" "}
                                Demo
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {openDemoSkills.length > 0 && (
                      <div className={styles.demoVideosContainer}>
                        {openDemoSkills.map((skill) => (
                          <div key={skill.title} className={styles.demoContainer}>
                            <iframe
                              width="480"
                              height="270"
                              src={`${getEmbedUrl(skill.demoUrl!)}?autoplay=1`}
                              title={`${skill.title} demo video`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
