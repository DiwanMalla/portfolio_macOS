"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Project {
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

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  loading: true,
  error: null,
});

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");

        const contentType = response.headers.get("content-type");
        if (
          !response.ok ||
          (contentType && contentType.includes("text/html"))
        ) {
          throw new Error("API unavailable");
        }

        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.warn("Failed to fetch projects, using fallback data:", err);
        setProjects(FALLBACK_PROJECTS);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
}
