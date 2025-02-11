// client/src/App.tsx
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import About from './pages/About';
import Skills from './pages/Skills';
import Apps from './pages/Apps';
import Contact from './pages/Contact';
import Certificate from './pages/Certificate';
import Comments from './pages/Comments';

const App: React.FC = () => {

  const [message, setMessage] = useState('');
  const hasFetched = useRef(false); // fetch 여부를 추적하기 위한 ref

  useEffect(() => {
    if (hasFetched.current) return; // 이미 fetch 했다면 종료
    hasFetched.current = true; // fetch 시작

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


  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/comments" element={<Comments />} />

        {/* 존재하지 않는 경로로 이동 시 기본 페이지로 리디렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
