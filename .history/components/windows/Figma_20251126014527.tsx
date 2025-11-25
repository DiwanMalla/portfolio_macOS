"use client";

import { Palette, Sparkles, Clock } from "lucide-react";

export default function Figma() {
  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Figma Toolbar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-purple-600" />
            <span className="font-semibold text-gray-900 dark:text-white">
              Design Projects
            </span>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="h-[calc(100%-60px)] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse" />
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl">
              <Sparkles size={48} className="text-white mx-auto" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Coming Soon
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Design explorations and creative work are on the way. 
            Stay tuned for something special.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600 dark:text-purple-400">
            <Clock size={16} />
            <span>Currently in development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
