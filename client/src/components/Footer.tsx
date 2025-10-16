// client/src/components/Footer.tsx
import React from 'react';
import { FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 shadow-inner z-50">
    <div className="container mx-auto flex items-center justify-between px-4 py-3">
      {/* 좌측: 저작권 및 호스팅 정보 */}
      <p className="text-gray-400 text-sm">
        © 2025 Jung Soo Shin | Hosted on AWS
      </p>

      {/* 우측: 소셜 아이콘 */}
      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com/uiorewq9950/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.youtube.com/@JaceDashS"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaYoutube size={20} />
        </a>
        <a
          href="https://github.com/Jacedashs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
