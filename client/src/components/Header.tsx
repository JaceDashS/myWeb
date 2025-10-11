// client/src/components/Header.tsx
import React, { useState, useEffect, RefObject } from 'react';
import { useDevice } from '../hooks/useDevice';

type SectionRefs = {
  about: RefObject<HTMLElement>;
  skills: RefObject<HTMLElement>;
  certificate: RefObject<HTMLElement>;
  apps: RefObject<HTMLElement>;
  comments: RefObject<HTMLElement>;
  contact: RefObject<HTMLElement>;
};

interface HeaderProps {
  sectionRefs: SectionRefs;
}

const sections = [
  { key: 'apps', label: 'Apps' },
  { key: 'comments', label: 'Comments/Feedback' },
  { key: 'about', label: 'About' },
  // { key: 'skills', label: 'Skills' },
  // { key: 'certificate', label: 'Certificates' },
  // { key: 'contact', label: 'Contact' },
] as const;

type SectionKey = typeof sections[number]['key'];

const Header: React.FC<HeaderProps> = ({ sectionRefs }) => {
  const { isMobile } = useDevice();
  const [active, setActive] = useState<SectionKey>('apps');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      sections.forEach(({ key }) => {
        const ref = sectionRefs[key];
        if (ref.current) {
          const { offsetTop } = ref.current;
          if (scrollPos >= offsetTop) {
            setActive(key);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (ref: RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 w-full bg-gray-800/90 backdrop-blur z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <nav className="flex space-x-4">
            {sections.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => scrollToSection(sectionRefs[key])}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${active === key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header className="fixed top-0 left-0 w-full bg-gray-800/90 backdrop-blur z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="text-2xl font-bold text-indigo-400">Jace-s.com</div>
          <nav className="flex space-x-4">
            {sections.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => scrollToSection(sectionRefs[key])}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${active === key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    );
  }
};

export default Header;