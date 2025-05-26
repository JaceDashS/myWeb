// client/src/pages/About.tsx
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

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
    const [activeTab, setActiveTab] = useState<string>('Description');
    const [animate, setAnimate] = useState<boolean>(false);
    const [demoUrl, setDemoUrl] = useState<string | null>(null);
    const [showAWS, setShowAWS] = useState(false);
    const [showJLPT, setShowJLPT] = useState(false);

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
                                src="/images/profile.jpg"
                                alt="Profile"
                                className="w-36 h-36 rounded-full border-4 border-gray-700"
                            />
                        </div>
                        <div className="p-2 rounded-md mx-auto">
                            <img
                                src="/images/output-onlinepngtools.png"
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
                                        src="/images/AWS-Certified-Cloud-Practitioner.png"
                                        alt="AWS Certified Cloud Practitioner"
                                        className="h-40 mx-auto"
                                    />
                                </div>
                                <div
                                    className="flex-1 bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                                    onClick={toggleJLPT}
                                >
                                    <img
                                        src="/images/Japanese-Language_Proficiency_Test_logo.png"
                                        alt="Japanese-Language_Proficiency_Test"
                                        className="h-40 mx-auto"
                                    />
                                </div>
                            </div>

                            {showAWS && (
                                <div className="w-full aspect-[297/250] relative rounded-md overflow-hidden">
                                    <iframe
                                        src="/images/AWS-Certified-Cloud-Practitioner-certificate.pdf#page=1&view=FitH"
                                        className="absolute inset-0 w-full h-full border-0"
                                    />
                                </div>
                            )}

                            {showJLPT && (
                                <div className="certificate-details bg-gray-800 p-4 rounded-lg">
                                    <div className="flex space-x-4">
                                        <img
                                            src="/images/jlpt_1.jpg"
                                            alt="JLPT Certificate 1"
                                            className="w-1/2 rounded"
                                        />
                                        <img
                                            src="/images/jlpt_2.jpg"
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
};

export default About;
