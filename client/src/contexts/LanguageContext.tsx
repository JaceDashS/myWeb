import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Language = 'en' | 'zh' | 'ja' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 브라우저 설정을 기반으로 언어 감지
const detectUserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const raw = navigator.language || (navigator as any).userLanguage || 'en';
  const lower = raw.toLowerCase();

  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('zh')) return 'zh';

  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // localStorage에서 저장된 언어 가져오기
    const saved = localStorage.getItem('language') as Language | null;
    return saved || detectUserLanguage();
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

