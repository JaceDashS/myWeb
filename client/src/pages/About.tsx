// client/src/pages/About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDevice } from '../hooks/useDevice';
import { ImageAssets } from '../config/imageAssets';

interface Skill {
    title: string;
    level: number; // percent (0-100)
    demoUrl?: string;
}

const tabs = ['Description', 'Skills', 'Certificates', 'Contact'];

const skillsData: { [category: string]: Skill[] } = {
    'Programming Languages': [
        { title: 'Python', level: 90 },
        // { title: 'JavaScript', level: 90 },
        { title: 'TypeScript', level: 90 },
        { title: 'C', level: 85 },
        { title: 'Java', level: 80 },
    ],
    'Web Technologies': [
        { title: 'HTML', level: 90 },
        { title: 'CSS', level: 90 },
        { title: 'React', level: 90 },
    ],
    'Cloud Services': [
        { title: 'MongoDB', level: 90 },
        { title: 'AWS', level: 30 },
        { title: 'OCI', level: 10 },
    ],
    'Backend Frameworks': [
        { title: 'PyTorch', level: 80 },
        { title: 'Express', level: 80 },
        { title: 'Go', level: 50 },
    ],
    Languages: [
        { title: 'Korean', level: 100 },
        { title: 'English', level: 90 },
        { title: 'Japanese', level: 90 },
    ],
    Others: [
        { title: 'Guitar', level: 80, demoUrl: 'https://youtu.be/E1NmOPQkScU' },
        { title: 'Music Production', level: 50, demoUrl: 'https://www.youtube.com/watch?v=YkOgEa7yRwo' },
    ],
};

const categoryRows = [
    ['Programming Languages'],
    ['Web Technologies', 'Cloud Services'],
    ['Backend Frameworks', 'Languages'],
    ['Others'],
];

const About: React.FC = () => {
    const { width, isMobile } = useDevice();
    // console.log('Window width:', width, 'isMobile:', isMobile);

    const [activeTab, setActiveTab] = useState<string>('Description');

    const tabsNavRef = useRef<HTMLDivElement>(null);
    // 탭 네비게이션을 좌우로 부드럽게 스크롤하기 위한 함수
    const scrollTabs = (direction: 'left' | 'right') => {
        const nav = tabsNavRef.current;
        if (!nav) return;
        const scrollAmount = nav.clientWidth * 0.6; // 한번에 뷰포트의 60% 만큼
        nav.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    // 모바일 슬라이드 탭용 (새 변수)
    // 화살표 클릭 핸들러
    const prevSlide = () => setSlideIndex(i => Math.max(i - 1, 0));
    const nextSlide = () => setSlideIndex(i => Math.min(i + 1, tabs.length - 1));
    const navRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null); // 터치·마우스 이벤트 + 폭 측정
    const sliderRef = useRef<HTMLDivElement>(null); // flex 패널 그룹
    const startXRef = useRef(0);
    const draggingRef = useRef(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [viewportW, setViewportW] = useState(0);
    useEffect(() => {
        const update = () => setViewportW(sectionRef.current?.clientWidth || 0);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // ④ 포인터 핸들러
    const handleDown = (e: React.PointerEvent) => {
        draggingRef.current = true;
        startXRef.current = e.clientX;
    };
    const handleMove = (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        setDragOffset(e.clientX - startXRef.current);
    };
    const handleUp = () => {
        if (!draggingRef.current) return;
        draggingRef.current = false;

        const threshold = viewportW * 0.3;
        if (dragOffset < -threshold && slideIndex < tabs.length - 1) {
            setSlideIndex(i => i + 1);           // → 다음
        } else if (dragOffset > threshold && slideIndex > 0) {
            setSlideIndex(i => i - 1);           // ← 이전
        }
        setDragOffset(0);                      // 스냅백
    };

    const [dragOffsetNav, setDragOffsetNav] = useState(0);
    const [navWidth, setNavWidth] = useState(0);
    useEffect(() => {
        const resize = () => setNavWidth(navRef.current?.clientWidth || 0);
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);
    const handlePointerDownNav = (e: React.PointerEvent) => {
        draggingRef.current = true;
        startXRef.current = e.clientX;
    };
    const handlePointerMoveNav = (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        setDragOffsetNav(e.clientX - startXRef.current);
    };
    const handlePointerUpNav = (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        const diff = e.clientX - startXRef.current;
        const threshold = containerWidth * 0.3;
        if (diff < -threshold) nextSlide();
        else if (diff > threshold) prevSlide();
        setDragOffsetNav(0);
    };

    const touchStartX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        const THRESHOLD = 50; // px, 이만큼 넘겨야 스와이프 처리

        if (diff > THRESHOLD) {
            // 왼쪽으로 스와이프 → 다음 탭
            nextSlide();
        } else if (diff < -THRESHOLD) {
            // 오른쪽으로 스와이프 → 이전 탭
            prevSlide();
        }
    };

    // 슬라이드용 ref & 상태
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // 컨테이너 너비 측정
    useEffect(() => {
        const update = () => {
            setContainerWidth(containerRef.current?.clientWidth || 0);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // 포인터(터치/마우스) 이벤트 핸들러
    const handlePointerDown = (e: React.PointerEvent) => {
        draggingRef.current = true;
        startXRef.current = e.clientX;
    };
    const handlePointerMove = (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        const diff = e.clientX - startXRef.current;
        setDragOffset(diff);
    };
    const handlePointerUp = (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        const diff = e.clientX - startXRef.current;
        const threshold = viewportW * 0.3;
        if (diff < -threshold) nextSlide();
        else if (diff > threshold) prevSlide();
        setDragOffset(0);
    };
    const currentTab = tabs[slideIndex];

    const [animate, setAnimate] = useState<boolean>(false);
    const [demoUrl, setDemoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (tabs[slideIndex] === 'Skills' && demoUrl === null) {
            setAnimate(false);
            const t = setTimeout(() => setAnimate(true), 100);
            return () => clearTimeout(t);
        }
    }, [slideIndex, demoUrl]);

    // Skills 탭 또는 demoUrl 변경 시 애니메이션 리셋 후 재실행
    useEffect(() => {
        if (activeTab === 'Skills' && demoUrl === null) {
            setAnimate(false);
            const timer = setTimeout(() => setAnimate(true), 100);
            return () => clearTimeout(timer);
        }
    }, [activeTab, demoUrl]);

    const getEmbedUrl = (url: string) => {
        // watch?v=, youtu.be/, embed/ 모두 검사
        const idMatch =
            url.match(/(?:youtube\.com\/watch\?v=)([^&]+)/) ??
            url.match(/(?:youtu\.be\/)([^&]+)/) ??
            url.match(/(?:youtube\.com\/embed\/)([^&]+)/);
        const videoId = idMatch ? idMatch[1] : '';
        return videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : url;
    };

    const handleOpenInApp = (url: string) => {
        const id = extractVideoId(url);
        // Android용 intent URI
        const androidLink = `intent://www.youtube.com/watch?v=${id}#Intent;package=com.google.android.youtube;scheme=https;end`;
        // iOS용 custom scheme
        const iosLink = `youtube://${id}`;
        // User-Agent 검사 후 이동
        const target = /Android/i.test(navigator.userAgent) ? androidLink : iosLink;
        window.location.href = target;
    };

    const extractVideoId = (url: string): string => {
        const m = url.match(/(?:watch\?v=|youtu\.be\/)([^&]+)/);
        return m ? m[1] : '';
    };

    const [showAWS, setShowAWS] = useState(false);
    const [showJLPT, setShowJLPT] = useState(false);
    // activeTab 변경 시 기타 상태 초기화
    useEffect(() => {
        setShowAWS(false);
        setShowJLPT(false);
    }, [activeTab]);

    const toggleAWS = () => {
        setShowAWS(prev => {
            const next = !prev;
            if (next) setShowJLPT(false);
            return next;
        });
    };
    const toggleJLPT = () => {
        setShowJLPT(prev => {
            const next = !prev;
            if (next) setShowAWS(false);
            return next;
        });
    };
    // …(위에 hooks, state, handlers 정의 부분 생략)…  

    if (isMobile) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col px-4 py-6">
                {/* ─── 프로필 카드 ─── */}
                <aside className="mb-4">
                    <div className="bg-gray-800 p-3 rounded-xl shadow-md space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <h2 className="text-base font-medium text-indigo-300">Junior Developer</h2>
                                <h2 className="text-xl font-semibold text-gray-100">Jung Soo Shin</h2>
                            </div>
                            <img
                                src={ImageAssets.profile}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-2 border-gray-700"
                            />
                        </div>
                        <div className="p-2 mx-auto">
                            <img
                                src={ImageAssets.sbuLogo}
                                alt="Stony Brook University Logo"
                                className="w-40 h-auto filter invert brightness-200"
                            />
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-right text-gray-400 text-sm">Stony Brook, NY</p>
                            <p className="text-left text-gray-200 text-xs">
                                Bachelor of Science in Computer Science
                            </p>
                            <p className="text-left text-gray-400 text-[0.65rem] leading-snug">
                                Specialization in Artificial Intelligence and Data Science
                            </p>
                        </div>
                    </div>
                </aside>

                {/* ─── 슬라이드 전체 컨테이너 ─── */}
                <section
                    ref={sectionRef}
                    style={{ touchAction: 'pan-y' }}
                    onPointerDown={handleDown}
                    onPointerMove={handleMove}
                    onPointerUp={handleUp}
                    onPointerCancel={handleUp}
                    className="relative overflow-hidden bg-gray-800 rounded-xl mb-4"
                >
                    {/* 좌 화살표 */}
                    <button
                        onClick={() => setSlideIndex(i => Math.max(i - 1, 0))}
                        disabled={slideIndex === 0}
                        className="absolute left-2 top-2 z-10 p-2 bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* 패널 그룹 */}
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-200 ease-out"
                        style={{
                            transform: `translateX(${-slideIndex * viewportW + dragOffset}px)`
                        }}
                    >
                        {tabs.map(tab => (
                            <div key={tab} className="w-full flex-shrink-0 px-3 py-4">
                                <h3 className="text-lg font-semibold text-center mb-2">{tab}</h3>


                                {/* 탭별 콘텐츠 */}
                                {tab === 'Description' && (
                                    <div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            I hold a Bachelor of Science in Computer Science from Stony Brook University, with a specialization in Artificial Intelligence and Data Science.
                                            <br />
                                            Being fluent in English, Korean, and Japanese allows me to access a wide range of technical resources, documentation, and communities across different languages.
                                            <br />
                                            Driven by curiosity, I’m always eager to explore emerging tools and frameworks that push the boundaries of what technology can do.
                                            <br />
                                            Outside of tech, I enjoy staying active and expressing myself through music. I mainly play the guitar, have studied music theory, and composed several original pieces.
                                        </p>
                                    </div>
                                )}

                                {tab === 'Skills' && !demoUrl && (
                                    <div>
                                        {categoryRows.map((row, idx) => (
                                            <div key={idx} className="space-y-4">
                                                {row.map(category => (
                                                    <div key={category}>
                                                        <h4 className="text-base font-medium text-gray-300 mb-1">
                                                            {category}
                                                        </h4>
                                                        {skillsData[category].map(skill => (
                                                            <div key={skill.title} className="mb-3">
                                                                <div className="flex justify-between text-gray-200 text-sm">
                                                                    <span>{skill.title}</span>
                                                                    <span>{skill.level}%</span>
                                                                </div>
                                                                <div className="w-full bg-gray-700 rounded-lg h-1 overflow-hidden">
                                                                    <div
                                                                        className="bg-indigo-600 h-1 rounded-lg transition-all duration-700 ease-in-out"
                                                                        style={{ width: animate ? `${skill.level}%` : '0%' }}
                                                                    />
                                                                </div>
                                                                {skill.demoUrl && (
                                                                    <button
                                                                        onClick={() => handleOpenInApp(skill.demoUrl!)}
                                                                        className="text-[0.65rem] text-indigo-300 underline mt-1 block"
                                                                    >
                                                                        Demo
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {tab === 'Skills' && demoUrl && (
                                    <div className="w-full h-0 pb-[56.25%] relative">
                                        <iframe
                                            src={getEmbedUrl(demoUrl)}
                                            className="absolute inset-0 w-full h-full rounded-xl"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Skill Demo"
                                        />
                                    </div>
                                )}

                                {tab === 'Certificates' && (
                                    <div className="space-y-4">
                                        {/* AWS 토글 */}
                                        <div
                                            className="bg-gray-700 p-3 rounded-lg cursor-pointer"
                                            onClick={toggleAWS}
                                        >
                                            <img
                                                src={ImageAssets.awsCertificateBadge}
                                                alt="AWS Certified Cloud Practitioner"
                                                className="h-32 mx-auto"
                                            />
                                        </div>

                                        {/* AWS 인증서: AWS 토글 바로 다음, JLPT 토글 전에 */}
                                        {showAWS && (
                                            <div className="mt-2 space-y-2">
                                                <img
                                                    src={ImageAssets.awsCertificate}
                                                    alt="AWS-Certified-Cloud-Practitioner-certificate"
                                                    className="w-full rounded"
                                                />
                                            </div>
                                        )}

                                        {/* JLPT 토글 */}
                                        <div
                                            className="bg-gray-700 p-3 rounded-lg cursor-pointer"
                                            onClick={toggleJLPT}
                                        >
                                            <img
                                                src={ImageAssets.jlptLogo}
                                                alt="Japanese-Language_Proficiency_Test"
                                                className="h-32 mx-auto"
                                            />
                                        </div>

                                        {/* JLPT 인증서 */}
                                        {showJLPT && (
                                            <div className="mt-2 space-y-2">
                                                <img
                                                    src={ImageAssets.jlptCertificate1}
                                                    alt="JLPT Certificate 1"
                                                    className="w-full rounded"
                                                />
                                                <img
                                                    src={ImageAssets.jlptCertificate2}
                                                    alt="JLPT Certificate 2"
                                                    className="w-full rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {tab === 'Contact' && (
                                    <div className="space-y-3 text-sm">
                                        <p className="flex items-center text-gray-300">
                                            <FaPhone className="mr-2 text-indigo-400" />
                                            <a href="tel:8452904720" className="text-gray-100">
                                                845-290-4720
                                            </a>
                                        </p>
                                        <p className="flex items-center text-gray-300">
                                            <FaEnvelope className="mr-2 text-indigo-400" />
                                            <a href="mailto:jungsoo.shin0827@gmail.com" className="text-gray-100">
                                                jungsoo.shin0827@gmail.com
                                            </a>
                                        </p>
                                        <p className="flex items-center text-gray-300">
                                            <FaInstagram className="mr-2 text-indigo-400" />
                                            <a
                                                href="https://www.instagram.com/uiorewq9950/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-100"
                                            >
                                                instagram.com/uiorewq9950
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 우 화살표 */}
                    <button
                        onClick={() => setSlideIndex(i => Math.min(i + 1, tabs.length - 1))}
                        disabled={slideIndex === tabs.length - 1}
                        className="absolute right-2 top-2 z-10 p-2 bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronRight />
                    </button>
                </section>
            </div>
        );
    }
    else {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
                <main className="flex-1 container mx-auto px-0 py-10 lg:flex lg:items-start lg:space-x-8">
                    <aside className="self-start lg:w-1/2 mb-6 lg:mb-0 lg:mr-6">
                        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 pr-4">
                                    <h2 className="text-indigo-300 text-lg md:text-xl font-medium">Junior Developer</h2>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Jung Soo Shin</h2>
                                </div>
                                <img
                                    src={ImageAssets.profile}
                                    alt="Profile"
                                    className="w-36 h-36 rounded-full border-4 border-gray-700"
                                />
                            </div>
                            <div className="p-2 rounded-md mx-auto">
                                <img
                                    src={ImageAssets.sbuLogo}
                                    alt="Stony Brook University Logo"
                                    className="w-32 h-auto md:w-80 filter invert brightness-200"
                                />
                            </div>
                            <div className="space-y-1 text-gray-300 text-base w-full">
                                <p className="text-right text-gray-500">Stony Brook, NY</p>
                                <p className="text-left">Bachelor of Science in Computer Science</p>
                                <p className="text-left text-gray-500 text-xs md:text-sm">
                                    Specialization in Artificial Intelligence and Data Science
                                </p>
                            </div>
                        </div>
                    </aside>
                    <section className="self-start lg:w-2/3 bg-gray-800 px-8 py-4 rounded-2xl shadow-lg">

                        <nav className="flex space-x-4 mb-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        if (tab === 'Skills') {
                                            setDemoUrl(null);
                                            setAnimate(false);
                                        }
                                        setActiveTab(tab);
                                    }}
                                    className={`px-3 py-1 rounded-md font-medium ${activeTab === tab && !(tab === 'Skills' && demoUrl)
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>

                        {activeTab === 'Description' && (
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold">Description</h3>
                                <p className="mt-2 leading-relaxed text-gray-300 text-base md:text-lg">
                                    I hold a Bachelor of Science in Computer Science from Stony Brook University, with a specialization in Artificial Intelligence and Data Science.
                                    <br />
                                    Being fluent in English, Korean, and Japanese allows me to access a wide range of technical resources, documentation, and communities across different languages. This gives me a unique advantage in learning new technologies faster and more effectively than others.
                                    <br />
                                    Driven by curiosity, I’m always eager to explore emerging tools and frameworks that push the boundaries of what technology can do.
                                    <br />
                                    Outside of tech, I enjoy staying active and expressing myself through music. I mainly play the guitar, have studied music theory, and composed several original pieces.
                                </p>
                            </div>
                        )}

                        {activeTab === 'Skills' && demoUrl && (
                            <div className="w-full h-0 pb-[56.25%] relative">
                                <iframe
                                    src={getEmbedUrl(demoUrl)}
                                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Skill Demo"
                                />
                            </div>
                        )}

                        {activeTab === 'Skills' && !demoUrl && (
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-2">Skills</h3>
                                <div className="mt-4 space-y-6">
                                    {categoryRows.map((row, idx) => (
                                        <div key={idx} className="lg:flex lg:space-x-6">
                                            {row.map(category => (
                                                <div key={category} className="flex-1">
                                                    <h4 className="text-xl font-medium text-gray-300 mb-2">{category}</h4>
                                                    {skillsData[category].map(skill => (
                                                        <div key={skill.title} className="mb-4">
                                                            <div className="flex justify-between text-gray-200">
                                                                <span>{skill.title}</span>
                                                                <span>{skill.level}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-lg h-1.5 overflow-hidden">
                                                                <div
                                                                    className="bg-indigo-600 h-1.5 rounded-lg transition-all duration-700 ease-in-out"
                                                                    style={{ width: animate ? `${skill.level}%` : '0%' }}
                                                                />
                                                            </div>
                                                            {skill.demoUrl && (
                                                                <button
                                                                    onClick={() => setDemoUrl(skill.demoUrl!)}
                                                                    className="text-xs text-indigo-300 underline mt-1 cursor-pointer hover:text-indigo-100"
                                                                >
                                                                    Demo
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Certificates' && (
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Certificates</h3>
                                <div className="flex space-x-6 mb-4">
                                    <div
                                        className="flex-1 bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                                        onClick={toggleAWS}
                                    >
                                        <img
                                            src={ImageAssets.awsCertificateBadge}
                                            alt="AWS Certified Cloud Practitioner"
                                            className="h-40 mx-auto"
                                        />
                                    </div>
                                    <div
                                        className="flex-1 bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                                        onClick={toggleJLPT}
                                    >
                                        <img
                                            src={ImageAssets.jlptLogo}
                                            alt="Japanese-Language_Proficiency_Test"
                                            className="h-40 mx-auto"
                                        />
                                    </div>
                                </div>

                                {showAWS && (
                                    <div className="w-full aspect-[297/250] relative rounded-md overflow-hidden">
                                        <iframe
                                            src={`${ImageAssets.awsCertificatePdf}#page=1&view=FitH`}
                                            className="absolute inset-0 w-full h-full border-0"
                                        />
                                    </div>
                                )}

                                {showJLPT && (
                                    <div className="certificate-details bg-gray-800 p-4 rounded-lg">
                                        <div className="flex space-x-4">
                                            <img
                                                src={ImageAssets.jlptCertificate1}
                                                alt="JLPT Certificate 1"
                                                className="w-1/2 rounded"
                                            />
                                            <img
                                                src={ImageAssets.jlptCertificate2}
                                                alt="JLPT Certificate 2"
                                                className="w-1/2 rounded"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'Contact' && (
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Contact</h3>
                                <div className="space-y-4">
                                    <p className="flex items-center text-gray-300">
                                        <FaPhone className="mr-2 text-indigo-400" />
                                        <strong>Phone:</strong>&nbsp;
                                        <a href="tel:8452904720" className="text-gray-100 hover:text-white">
                                            845-290-4720
                                        </a>
                                    </p>
                                    <p className="flex items-center text-gray-300">
                                        <FaEnvelope className="mr-2 text-indigo-400" />
                                        <strong>Email:</strong>&nbsp;
                                        <a href="mailto:jungsoo.shin0827@gmail.com" className="text-gray-100 hover:text-white">
                                            jungsoo.shin0827@gmail.com
                                        </a>
                                    </p>
                                    <p className="flex items-center text-gray-300">
                                        <FaInstagram className="mr-2 text-indigo-400" />
                                        <strong>Instagram:</strong>&nbsp;
                                        <a href="https://www.instagram.com/uiorewq9950/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white">
                                            instagram.com/uiorewq9950
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>
                </main>
                {/* <Footer /> */}
            </div >
        );
    }
};

export default About;
