"use client";

import { ExternalLink, Calendar, Tag, User } from "lucide-react";
import Image from "next/image";

interface ProjectDetailProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    images: string[];
    description: string;
    client: string;
    projectCategory: string[];
    tags: string[];
    livePreview: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  if (!project) {
    return (
      <div className="flex h-full items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500">No project selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 overflow-auto">
      {/* Hero Image */}
      {project.images && project.images[0] && (
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === "publish"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.projectCategory.map((cat, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Tag size={16} />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            About This Project
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: project.description.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </div>

        {/* Additional Images */}
        {project.images && project.images.length > 1 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800"
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Preview Button */}
        {project.livePreview && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <ExternalLink size={18} />
              Visit Live Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
