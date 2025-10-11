// client/src/pages/Apps.tsx
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaAndroid, FaGlobe, FaPlay, FaGithub } from 'react-icons/fa';
import { ImageAssets } from '../config/imageAssets';

interface App {
  title: string;
  description: string;
  image: string;
  apkUrl?: string;
  webUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

const appsData: App[] = [
  {
    title: 'Squat Balancer',
    description: 'A service for optimizing your squat posture.',
    image: ImageAssets.squatBalancer,
    apkUrl: 'https://s3.us-east-1.amazonaws.com/cdn.jace-s.com/squat-balancer.apk',
    webUrl: 'https://squat-balancer.netlify.app/',
    demoUrl: 'https://www.youtube.com/watch?v=-wBZ6eyQMms',
    githubUrl: 'https://github.com/Jace0827/Squat-Balancer',
  },
  {
    title: 'Transformer Attention Visualizer',
    description: 'User friendly attention visualizer',
    image: ImageAssets.transformerAttentionVisualizer,
    webUrl: 'https://bert-attention-visualizer.vercel.app/',
    githubUrl: 'https://github.com/Team-Lasso/bert-attention-visualizer',
  },
];

const Apps: React.FC = () => {
  const [showDemoTitle, setShowDemoTitle] = useState<string | null>(null);

  const toggleDemo = (title: string) => {
    setShowDemoTitle(prev => (prev === title ? null : title));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 container mx-auto px-0 py-4">
        <h1 className="text-3xl font-bold mb-6">Applications</h1>
        <div className="space-y-6">
          {appsData.map(app => (
            <div key={app.title} className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
              <img
                src={app.image}
                alt={`${app.title} icon`}
                className="w-24 h-24 rounded-md flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-1">{app.title}</h2>
                <p className="text-gray-300 mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-2">
                  {app.apkUrl && (
                    <a
                      href={app.apkUrl}
                      download
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaAndroid className="mr-2" /> APK
                    </a>
                  )}
                  {app.webUrl && (
                    <a
                      href={app.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaGlobe className="mr-2" /> Web
                    </a>
                  )}
                  {app.demoUrl && (
                    <button
                      onClick={() => toggleDemo(app.title)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaPlay className="mr-2" /> Demo
                    </button>
                  )}
                  {app.githubUrl && (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaGithub className="mr-2" /> Code
                    </a>
                  )}
                </div>
                {showDemoTitle === app.title && app.demoUrl && (
                  <div className="mt-4 w-full aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${new URL(app.demoUrl).searchParams.get('v')}`}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${app.title} Demo`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Apps;
