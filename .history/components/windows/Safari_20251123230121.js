"use client";

import { useState } from "react";
import { Search, RefreshCw, Share2, BookmarkPlus } from "lucide-react";

export default function Safari() {
  const [url, setUrl] = useState("https://github.com/yourusername");

  const portfolioSections = [
    {
      title: "About Me",
      description: "Learn about my background and experience",
    },
    {
      title: "Projects",
      description: "Explore my latest work and contributions",
    },
    { title: "Skills", description: "View my technical expertise" },
    { title: "Contact", description: "Get in touch with me" },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Browser Header */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-1.5 border border-gray-300 dark:border-gray-600">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <Share2 size={16} />
          </button>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <BookmarkPlus size={16} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Full Stack Developer | Creative Problem Solver
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioSections.map((section, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Available for Work
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              I&apos;m currently open to new opportunities. Let&apos;s build
              something amazing together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
