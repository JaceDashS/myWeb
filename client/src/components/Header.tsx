// client/src/components/Header.tsx
import React, { useState, useEffect, RefObject, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import { useLanguage } from '../contexts/LanguageContext';

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

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'zh' as const, label: '中' },
  { code: 'ja' as const, label: '日' },
  { code: 'ko' as const, label: '한' },
];

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
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<SectionKey>('apps');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // URL 경로에 따라 active 상태 업데이트 (단일 소스)
  useEffect(() => {
    const path = location.pathname;
    const pathToKey: { [key: string]: SectionKey } = {
      '/apps': 'apps',
      '/comments': 'comments',
      '/about': 'about',
    };
    const key = pathToKey[path];
    if (key) {
      setActive(key);
    }
  }, [location.pathname]);

  const scrollToSection = (ref: RefObject<HTMLElement>, sectionKey: SectionKey) => {
    // 이미 같은 섹션이면 스크롤하지 않음
    if (location.pathname === `/${sectionKey}` && active === sectionKey) {
      return;
    }
    
    // URL 업데이트 (App.tsx의 useEffect가 스크롤 처리)
    navigate(`/${sectionKey}`, { replace: true });
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 w-full bg-gray-800/90 backdrop-blur z-50">
        <div className="container mx-auto flex items-center justify-between px-2 py-2">
          <nav className="flex space-x-1">
            {sections.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => scrollToSection(sectionRefs[key], key)}
                className={`px-2 py-1 rounded-md transition-colors font-medium text-sm ${active === key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
          {/* 언어 선택 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1 rounded-md border border-gray-600 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              {currentLanguage.label}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg min-w-[80px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="fixed top-0 left-0 w-full bg-gray-800/90 backdrop-blur z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <nav className="flex space-x-4">
            {sections.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => scrollToSection(sectionRefs[key], key)}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${active === key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
          {/* 언어 선택 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1 rounded-md border border-gray-600 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              {currentLanguage.label}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg min-w-[80px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
};

export default Header;