"use client";

import { useState } from "react";
import {
  Folder,
  FileText,
  Image as ImageIcon,
  HardDrive,
  Clock,
  Cloud,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Finder() {
  const [activeSidebar, setActiveSidebar] = useState("recents");

  const sidebarItems = [
    { id: "recents", label: "Recents", icon: Clock },
    { id: "applications", label: "Applications", icon: HardDrive },
    { id: "desktop", label: "Desktop", icon: Folder },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "icloud", label: "iCloud Drive", icon: Cloud },
  ];

  const files = [
    { id: 1, name: "Project Specs.pdf", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Design Assets", type: "folder", size: "--" },
    { id: 3, name: "profile-pic.jpg", type: "image", size: "1.2 MB" },
    { id: 4, name: "Resume_Final.pdf", type: "pdf", size: "156 KB" },
    { id: 5, name: "Notes.txt", type: "text", size: "4 KB" },
    { id: 6, name: "Budget 2025.xlsx", type: "excel", size: "45 KB" },
  ];

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-1">
        <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2 mb-1">
          Favorites
        </div>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSidebar(item.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md w-full text-left transition-colors ${
                activeSidebar === item.id
                  ? "bg-gray-300/50 dark:bg-gray-600/50 text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <Icon
                size={16}
                className={
                  activeSidebar === item.id ? "text-blue-500" : "text-gray-500"
                }
              />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4 bg-white dark:bg-gray-900">
          <div className="flex gap-2 text-gray-500">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronLeft size={18} />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronRight size={18} />
            </button>
          </div>
          <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">
            {activeSidebar}
          </span>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-900">
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md cursor-pointer group"
              >
                <div className="w-12 h-12 flex items-center justify-center text-gray-400">
                  {file.type === "folder" && (
                    <Folder
                      size={40}
                      className="text-blue-400 fill-blue-400/20"
                    />
                  )}
                  {file.type === "pdf" && (
                    <FileText size={40} className="text-red-400" />
                  )}
                  {file.type === "image" && (
                    <ImageIcon size={40} className="text-purple-400" />
                  )}
                  {file.type === "text" && (
                    <FileText size={40} className="text-gray-400" />
                  )}
                  {file.type === "excel" && (
                    <FileText size={40} className="text-green-400" />
                  )}
                </div>
                <span className="text-center text-xs text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 break-all">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
