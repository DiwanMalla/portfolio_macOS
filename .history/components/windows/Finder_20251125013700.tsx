"use client";

import { useState } from "react";
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
import { useProjects } from "@/contexts/ProjectsContext";
import useStore from "@/store/useStore";

export default function Finder() {
  const [activeSidebar, setActiveSidebar] = useState("all");
  const { projects, loading } = useProjects();
  const { openWindow } = useStore();

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
                <button
                  key={project._id}
                  onClick={() => {
                    openWindow({
                      id: `project-${project._id}`,
                      title: project.title,
                      component: "projectDetail",
                      icon: "/images/safari.png",
                      projectData: project,
                    });
                  }}
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
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
