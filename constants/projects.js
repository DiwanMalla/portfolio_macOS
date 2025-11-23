import { profile } from "./profile";

export const safariHero = {
  heading: "Welcome to My Portfolio",
  subheading: `${profile.title} | Creative Problem Solver`,
  availability: profile.availability,
  message: "Currently building magical desktop-inspired experiences.",
};

export const portfolioSections = [
  {
    id: "about",
    title: "About Me",
    description:
      "Discover how I combine motion and systems thinking to ship polished work.",
  },
  {
    id: "projects",
    title: "Projects",
    description:
      "Browse flagship builds and experiments that shipped recently.",
  },
  {
    id: "skills",
    title: "Skills",
    description: "Tooling I reach for when crafting performant, animated UIs.",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Ready when you are—reach out and let's collaborate.",
  },
];

export const featuredProjects = [
  {
    id: "mac-portfolio",
    title: "Mac OS Portfolio",
    description:
      "Interactive desktop with windows, dock, and GSAP transitions.",
    image: "/images/project-1.png",
    link: "https://github.com/diwanmalla",
    stack: ["Next.js", "GSAP", "Zustand"],
  },
  {
    id: "launchpad",
    title: "Launchpad Analytics",
    description: "Live metrics dashboard for early-stage startups.",
    image: "/images/project-2.png",
    link: "https://github.com/diwanmalla",
    stack: ["React", "Supabase", "Chart.js"],
  },
  {
    id: "canvas",
    title: "Canvas Collaboration",
    description: "Figma-style co-editing surface with comments and playback.",
    image: "/images/project-3.png",
    link: "https://github.com/diwanmalla",
    stack: ["Next.js", "WebRTC", "Tailwind"],
  },
];

export const photoGallery = [
  { id: "aurora", src: "/images/gal1.png", title: "Aurora Study" },
  { id: "gradient", src: "/images/gal2.png", title: "Gradient Fields" },
  { id: "mesh", src: "/images/gal3.png", title: "Mesh Motion" },
  { id: "orbit", src: "/images/gal4.png", title: "Orbital Lighting" },
  { id: "project-1", src: "/images/project-1.png", title: "Mac Desktop" },
  { id: "project-2", src: "/images/project-2.png", title: "Analytics Hub" },
  { id: "project-3", src: "/images/project-3.png", title: "Canvas" },
  { id: "blog-1", src: "/images/blog1.png", title: "Blog Layout" },
];

export const designShowcase = [
  {
    id: "commerce",
    title: "E-commerce UI",
    type: "Web Design",
    color: "bg-purple-500",
    icon: "layout",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    type: "App Design",
    color: "bg-blue-500",
    icon: "sparkles",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    type: "UI/UX",
    color: "bg-green-500",
    icon: "code",
  },
  {
    id: "landing",
    title: "Landing Page",
    type: "Web Design",
    color: "bg-pink-500",
    icon: "palette",
  },
];
