"use client";

import { useState, useEffect } from "react";
import { Download, ExternalLink, FileText, ZoomIn } from "lucide-react";
import { profile } from "@/constants/profile";

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showPdfFallback, setShowPdfFallback] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check if screen is small or if it's a touch device
      const isSmallScreen = window.innerWidth < 640;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(isSmallScreen || isTouchDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For mobile/small screens, show a better fallback
  if (isMobile || showPdfFallback) {
    return (
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Mobile Toolbar */}
        <div className="min-h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between px-3 py-2 gap-2">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-red-500" />
            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
              DiwanMalla.pdf
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors active:scale-95"
            >
              <Download size={16} />
              <span>Download</span>
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors active:scale-95"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Open</span>
            </a>
          </div>
        </div>

        {/* Mobile Content - Preview Card */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-md mx-auto">
            {/* PDF Preview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* PDF Icon Header */}
              <div className="bg-linear-to-br from-red-500 to-red-600 p-8 flex flex-col items-center justify-center">
                <div className="w-20 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center mb-4">
                  <FileText size={40} className="text-red-500" />
                </div>
                <h2 className="text-white font-bold text-xl">Resume</h2>
                <p className="text-white/80 text-sm mt-1">Diwan Malla</p>
              </div>

              {/* Info Section */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                    Full-Stack Developer
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Sydney, Australia
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
                    View my professional resume with experience, skills,
                    education, and certifications.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-colors active:scale-[0.98]"
                  >
                    <ZoomIn size={18} />
                    View Full Resume
                  </a>
                  <a
                    href={profile.resume}
                    download
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors active:scale-[0.98]"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">4+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Years Experience
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-500">8+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Projects
                </p>
              </div>
            </div>

            {/* Switch to PDF View (if not truly mobile) */}
            {!isMobile && showPdfFallback && (
              <button
                onClick={() => setShowPdfFallback(false)}
                className="mt-4 w-full text-center text-sm text-blue-500 hover:text-blue-600 py-2"
              >
                Try PDF Viewer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Desktop Toolbar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-red-500" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            DiwanMalla.pdf
          </span>
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

      {/* PDF Viewer */}
      <div className="flex-1 relative w-full h-full bg-gray-500/20">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading PDF...
              </p>
            </div>
          </div>
        )}
        <iframe
          src={`${profile.resume}#toolbar=0&view=FitH`}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          onError={() => setShowPdfFallback(true)}
          title="Resume PDF"
          style={{ minHeight: "400px" }}
        />
      </div>
    </div>
  );
}
