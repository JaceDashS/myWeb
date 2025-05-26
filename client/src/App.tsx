// client/src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';  // ← Footer 임포트 추가
import About from './pages/About';
import Apps from './pages/Apps';
import Comments from './pages/Comments';

const App: React.FC = () => {
  /* ───────── refs for header nav ───────── */
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);   // stub
  const certificateRef = useRef<HTMLElement>(null);   // stub
  const appsRef = useRef<HTMLElement>(null);
  const commentsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);   // stub

  const sectionRefs = {
    about:       aboutRef,
    skills:      skillsRef,
    certificate: certificateRef,
    apps:        appsRef,
    comments:    commentsRef,
    contact:     contactRef,
  } as const;

  /* ───────── optional backend ping ───────── */
  const [message, setMessage] = useState('');
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetch(process.env.REACT_APP_API_URL || '/')
      .then(r => r.json())
      .then(d => setMessage(d.message))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* 헤더 */}
      <Header sectionRefs={sectionRefs} />

      {/* 본문 */}
      <main className="pt-16 flex-1 space-y-24">
        <section
          ref={aboutRef}
          className="-mt-16 scroll-mt-16 container mx-auto px-6"
        >
          <About />
        </section>

        <section
          ref={appsRef}
          className="scroll-mt-16 container mx-auto px-6"
        >
          <Apps />
        </section>

        <section
          ref={commentsRef}
          className="scroll-mt-16 container mx-auto px-6"
        >
          <Comments />
        </section>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default App;
