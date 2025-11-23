'use client';

import { useEffect } from 'react';
import useStore from '@/store/useStore';
import { wallpapers } from '@/constants/wallpapers';

export default function Desktop({ children }) {
  const wallpaper = useStore((state) => state.wallpaper);

  useEffect(() => {
    // Prevent context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const wallpaperUrl = wallpapers[wallpaper] || wallpapers.default;

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
}
