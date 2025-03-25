// client/src/App.tsx
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import About from './pages/About';
import Skills from './pages/Skills';
import Apps from './pages/Apps';
import Contact from './pages/Contact';
import Certificate from './pages/Certificate';
import Comments from './pages/Comments';

const App: React.FC = () => {
  // 각 섹션에 대한 ref 생성
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const certificateRef = useRef<HTMLElement>(null);
  const appsRef = useRef<HTMLElement>(null);
  const commentsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // 필요한 경우 API 호출 등 기존 로직 유지
  const [message, setMessage] = useState('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const apiUrl = process.env.REACT_APP_API_URL || '/';
    console.log('API URL:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(`Server response: ${data.message}`);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (message) {
      console.log(message);
    }
  }, [message]);

  // 섹션 ref들을 하나의 객체로 묶어서 Header에 전달
  const sectionRefs = {
    about: aboutRef,
    skills: skillsRef,
    certificate: certificateRef,
    apps: appsRef,
    comments: commentsRef,
    contact: contactRef,
  };

  return (
    <>
      <Header sectionRefs={sectionRefs} />
      <main>
        <section ref={aboutRef} className="scroll-section">
          <About />
        </section>
        <section ref={skillsRef}>
          <Skills />
        </section>
        <section ref={certificateRef}>
          <Certificate />
        </section>
        <section ref={appsRef}>
          <Apps />
        </section>
        <section ref={commentsRef}>
          <Comments />
        </section>
        <section ref={contactRef}>
          <Contact />
        </section>
      </main>
    </>
  );
};

export default App;
