'use client';

import { useState } from 'react';
import { Palette, Code, Layout, Sparkles } from 'lucide-react';

export default function Figma() {
  const designs = [
    { 
      id: 1, 
      title: 'E-commerce UI', 
      type: 'Web Design',
      color: 'bg-purple-500',
      icon: Layout 
    },
    { 
      id: 2, 
      title: 'Mobile App', 
      type: 'App Design',
      color: 'bg-blue-500',
      icon: Sparkles 
    },
    { 
      id: 3, 
      title: 'Dashboard', 
      type: 'UI/UX',
      color: 'bg-green-500',
      icon: Code 
    },
    { 
      id: 4, 
      title: 'Landing Page', 
      type: 'Web Design',
      color: 'bg-pink-500',
      icon: Palette 
    },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      {/* Figma Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-purple-600" />
            <span className="font-semibold text-gray-900 dark:text-white">Design Projects</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-8 overflow-auto h-[calc(100%-60px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designs.map((design) => {
            const Icon = design.icon;
            return (
              <div
                key={design.id}
                className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <div className={`w-full h-full ${design.color} p-8 flex flex-col items-center justify-center`}>
                  <Icon size={48} className="text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white">{design.title}</h3>
                  <p className="text-white/80 mt-2">{design.type}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Design Philosophy
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            I believe in creating user-centered designs that are both beautiful and functional. 
            Every pixel matters, and every interaction should feel natural.
          </p>
        </div>
      </div>
    </div>
  );
}
