// client/src/App.tsx
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';  // ← Footer 임포트 추가
import About from './pages/About';
import Apps from './pages/Apps';
import Comments from './pages/Comments';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // URL 경로와 섹션 매핑
  const pathToSection: { [key: string]: React.RefObject<HTMLElement> } = {
    '/apps': appsRef,
    '/comments': commentsRef,
    '/about': aboutRef,
  };

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAnimationFrameRef = useRef<number | null>(null);

  // URL 경로에 따라 해당 섹션으로 스크롤
  useEffect(() => {
    const path = location.pathname;
    
    // 기본 경로(/)는 apps로 리다이렉트
    if (path === '/') {
      navigate('/apps', { replace: true });
      return;
    }
    
    const targetRef = pathToSection[path];
    
    if (targetRef && targetRef.current) {
      // 이전 스크롤 취소
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
      
      isScrollingRef.current = true;
      
      // 즉시 스크롤 시작 (지연 제거)
      const targetElement = targetRef.current;
      const targetPosition = targetElement.offsetTop;
      
      // 현재 스크롤 위치
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 500; // 500ms로 고정
      let startTime: number | null = null;
      
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // easeInOutCubic easing function
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (progress < 1) {
          scrollAnimationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          scrollAnimationFrameRef.current = null;
        }
      };
      
      scrollAnimationFrameRef.current = requestAnimationFrame(animateScroll);
      
      // 안전장치: 일정 시간 후 플래그 해제
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        scrollTimeoutRef.current = null;
      }, duration + 100);
    }
    
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
    };
  }, [location.pathname, navigate]);

  // 스크롤 시 URL 업데이트 (throttle 적용)
  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      // 프로그래밍 방식 스크롤 중에는 URL 업데이트 안 함
      if (isScrollingRef.current) return;
      
      // debounce: 스크롤이 멈춘 후에만 URL 업데이트
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        if (isScrollingRef.current) return; // 다시 한번 확인
        
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            
            // 섹션 순서대로 체크 (위에서 아래로)
            const sectionOrder = ['apps', 'comments', 'about'];
            let activeSection: string | null = null;
            
            for (const key of sectionOrder) {
              const ref = sectionRefs[key as keyof typeof sectionRefs];
              if (ref.current) {
                const { offsetTop, offsetHeight } = ref.current;
                if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                  activeSection = key;
                  break;
                }
              }
            }
            
            // 가장 가까운 섹션 찾기 (스크롤 위치가 섹션 사이에 있을 때)
            if (!activeSection) {
              let minDistance = Infinity;
              for (const key of sectionOrder) {
                const ref = sectionRefs[key as keyof typeof sectionRefs];
                if (ref.current) {
                  const distance = Math.abs(ref.current.offsetTop - scrollPos);
                  if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = key;
                  }
                }
              }
            }
            
            if (activeSection) {
              const path = `/${activeSection}`;
              if (location.pathname !== path) {
                navigate(path, { replace: true });
              }
            }
            
            ticking = false;
          });
          ticking = true;
        }
      }, 150); // 스크롤이 멈춘 후 150ms 후에 URL 업데이트
    };

    // 초기 스크롤 위치 설정
    const timer = setTimeout(() => {
      if (!isScrollingRef.current) {
        handleScroll();
      }
    }, 600); // 스크롤 애니메이션 완료 후

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [location.pathname, navigate, sectionRefs]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* 헤더 */}
      <Header sectionRefs={sectionRefs} />

      {/* 본문 */}
      <main className="pt-16 flex-1 space-y-24">
        <section
          ref={appsRef}
          className="-mt-16 scroll-mt-16 container mx-auto px-6"
        >
          <Apps />
        </section>

        <section
          ref={commentsRef}
          className="scroll-mt-16 container mx-auto px-6"
        >
          <Comments />
        </section>

        <section
          ref={aboutRef}
          className="scroll-mt-16 container mx-auto px-6"
        >
          <About />
        </section>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default App;
