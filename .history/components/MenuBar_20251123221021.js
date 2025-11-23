'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Apple, Wifi, Battery } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(dayjs().format('ddd MMM D  h:mm A'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-black/30 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4 text-white text-xs font-medium">
      {/* Left side - Apple logo and app name */}
      <div className="flex items-center gap-4">
        <Apple size={14} fill="white" />
        <span className="font-semibold">Finder</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center gap-3">
        <Wifi size={14} />
        <Battery size={14} />
        <span className="tracking-wide">{time}</span>
      </div>
    </div>
  );
}
