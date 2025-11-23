"use client";

import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { profile } from "@/constants/profile";

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <div className="font-medium text-gray-700 dark:text-gray-200">
          Resume.pdf
        </div>
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          >
            <Download size={16} />
            Download
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* PDF Viewer (Iframe fallback) */}
      <div className="flex-1 relative w-full h-full bg-gray-500/20">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
        <iframe
          src={`${profile.resume}#toolbar=0`}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          title="Resume PDF"
        />
      </div>
    </div>
  );
}
