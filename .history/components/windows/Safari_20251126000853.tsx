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
import { profile, socialLinks } from "@/constants/profile";
import { Project } from "@/contexts/ProjectsContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface SafariProps {
  project?: Project;
}

export default function Safari({ project }: SafariProps) {
  const [url, setUrl] = useState(project?.livePreview || profile.website);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = url;
    if (!targetUrl.startsWith("http")) {
      targetUrl = `https://${targetUrl}`;
    }
    setIframeUrl(targetUrl);
  };

  const openLink = (linkUrl: string) => {
    setUrl(linkUrl);
    setIframeUrl(linkUrl);
  };

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

          <form
            onSubmit={handleNavigate}
            className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-1.5 border border-gray-300 dark:border-gray-600"
          >
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
            />
          </form>

          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <Share2 size={16} />
          </button>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <BookmarkPlus size={16} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-hidden relative">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            className="w-full h-full border-none bg-white"
            title="Browser View"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        ) : project ? (
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-200">
                      Client:
                    </span>
                    <span>{project.client}</span>
                  </div>
                )}
                {project.projectCategory &&
                  project.projectCategory.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-200">
                        Category:
                      </span>
                      <span>{project.projectCategory.join(", ")}</span>
                    </div>
                  )}
                {project.createdAt && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-200">
                      Date:
                    </span>
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full capitalize border border-gray-200 dark:border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="space-y-6 mb-10">
                  {/* Main Hero Image */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Gallery Grid for remaining images */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.images.slice(1).map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} - Gallery ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.description}
                </ReactMarkdown>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink size={18} />
                  Visit Live Project
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Favorites Section */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Favorites</h2>
                <div className="flex flex-wrap gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-105 border border-gray-200 dark:border-gray-700">
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={32}
                          height={32}
                          className="opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

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
