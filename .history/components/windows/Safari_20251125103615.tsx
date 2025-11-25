"use client";

import { useState } from "react";
import {
  Search,
  RefreshCw,
  Share2,
  BookmarkPlus,
  ExternalLink,
} from "lucide-react";
import { safariHero, portfolioSections } from "@/constants/projects";
import { profile } from "@/constants/profile";
import { Project } from "@/contexts/ProjectsContext";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface SafariProps {
  project?: Project;
}

export default function Safari({ project }: SafariProps) {
  const [url, setUrl] = useState(project?.livePreview || profile.website);

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
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
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
      <div className="flex-1 overflow-auto">
        {project ? (
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  Visit Live Site
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {safariHero.heading}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {safariHero.subheading}
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
                  {safariHero.availability}
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  {safariHero.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
