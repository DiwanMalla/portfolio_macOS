"use client";

import { useState, useEffect } from "react";
import {
  Folder,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Smartphone,
  Database,
  Globe,
  Loader2,
} from "lucide-react";
import Image from "next/image";

interface Project {
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
  __v: number;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "68e4f91ff871f159b402f782",
    title: "Job Tracker — Full-Stack Job Application Management",
    slug: "job-tracker",
    images: [
      "https://res.cloudinary.com/dd8lg68uc/image/upload/v1759836433/diwan-admin/file_1759836433882.jpg",
    ],
    description:
      "**Job Tracker** is a modern, **full-stack job application management system**...",
    client: "Personal / Portfolio Project",
    projectCategory: [
      "Web Development",
      "Mobile App Development",
      "Database Management",
    ],
    tags: ["javascript", "reactjs"],
    livePreview: "https://job-tracker-zeta-wheat.vercel.app",
    status: "publish",
    createdAt: "2025-10-07T11:27:27.684Z",
    updatedAt: "2025-10-07T11:27:27.684Z",
    __v: 0,
  },
];

export default function Finder() {
  const [activeSidebar, setActiveSidebar] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try fetching from the API
        const response = await fetch("/api/projects");

        // If the response is not OK or is HTML (404 page), throw error
        const contentType = response.headers.get("content-type");
        if (
          !response.ok ||
          (contentType && contentType.includes("text/html"))
        ) {
          throw new Error("API unavailable");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.warn("Failed to fetch projects, using fallback data:", err);
        // Use fallback data if API fails
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const sidebarItems = [
    { id: "all", label: "All Projects", icon: LayoutGrid },
    { id: "Web Development", label: "Web Dev", icon: Globe },
    { id: "Mobile App Development", label: "Mobile Apps", icon: Smartphone },
    { id: "Database Management", label: "Database", icon: Database },
  ];

  const filteredProjects =
    activeSidebar === "all"
      ? projects
      : projects.filter((p) => p.projectCategory.includes(activeSidebar));

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-1">
        <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2 mb-1">
          Projects
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
            {activeSidebar === "all" ? "All Projects" : activeSidebar}
          </span>
          <div className="flex-1" />
          <div className="text-xs text-gray-400">
            {filteredProjects.length} items
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-900">
          {loading ? (
            <div className="flex h-full items-center justify-center text-gray-400 gap-2">
              <Loader2 size={24} className="animate-spin" />
              <span>Loading projects...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <a
                  key={project._id}
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md cursor-pointer group transition-colors"
                  title={project.title}
                >
                  <div className="w-20 h-20 relative flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-all">
                    {project.images && project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Folder
                        size={40}
                        className="text-blue-400 fill-blue-400/20"
                      />
                    )}
                  </div>
                  <div className="text-center w-full mt-2">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 wrap-break-word leading-tight">
                      {project.title}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5 capitalize">
                      {project.tags[0] || "Project"}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
