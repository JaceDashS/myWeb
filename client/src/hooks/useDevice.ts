// src/hooks/useDevice.ts
import { useState, useEffect } from 'react';

export function useDevice() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 768;
  const isDesktop = width > 768;

  return { width, isMobile, isTablet, isDesktop };
}
