// client/src/pages/Apps.tsx
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaAndroid, FaGlobe, FaPlay, FaGithub } from 'react-icons/fa';
import Spinner from '../components/Spinner';

interface App {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  apkUrl?: string | null;
  webUrl?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  displayOrder: number;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

const Apps: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDemoTitle, setShowDemoTitle] = useState<string | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL || '/';

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}apps?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (res.ok) {
        // console.log('data.apps: ', data.apps);
        setApps(data.apps);
        setTotalCount(data.totalCount);
      } else {
        console.error('Failed to fetch apps:', data.error);
      }
    } catch (e) {
      console.error('Error fetching apps:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [page]);

  const toggleDemo = (title: string) => {
    setShowDemoTitle(prev => (prev === title ? null : title));
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 container mx-auto px-0 py-4">
        <h1 className="text-3xl font-bold mb-6">Applications</h1>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {apps.map(app => (
                <div key={app.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {app.imageUrl && (
                    <img
                      src={app.imageUrl}
                      alt={`${app.title} icon`}
                      className="w-24 h-24 rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-1">{app.title}</h2>
                    {app.description && (
                      <p className="text-gray-300 mb-4">{app.description}</p>
                    )}
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

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-600"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-800 rounded-md">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        )}
      </>
    )}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Apps;
