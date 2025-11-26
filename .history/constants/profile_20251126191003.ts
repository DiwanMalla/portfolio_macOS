export interface Profile {
  name: string;
  title: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  website: string;
  resume: string;
  avatar: string;
  summary: string;
}

export const profile: Profile = {
  name: "Diwan Malla",
  title: "Full-Stack Developer",
  location: "Sydney, Australia",
  availability: "Available for Mid to Senior Full-Stack roles",
  email: "malladipin@gmail.com",
  phone: "+61-0452140630",
  website: "https://www.diwanmalla.com.au",
  resume: "/files/Diwan Malla.pdf",
  avatar: "/images/adrian.jpg",
  summary:
    "Full Stack developer specializing in React.js, Material UI, and UX-driven design. I combine strong front-end skills with backend expertise to deliver scalable, AI-powered web applications.",
};

export interface HeroContent {
  headline: string;
  title: string;
  tagline: string;
}

export const heroContent: HeroContent = {
  headline: profile.name,
  title: profile.title,
  tagline: "Crafting cinematic, Mac OS-style interfaces on the web.",
};

export interface MenuConfig {
  branding: string;
  menus: string[];
}

export const menuConfig: MenuConfig = {
  branding: `${profile.name.split(" ")[0]} • Portfolio`,
  menus: ["File", "Edit", "View", "Go", "Window", "Help"],
};

export interface ContactInfo {
  email: string;
  phone: string;
  timezone: string;
  location: string;
}

export const contactInfo: ContactInfo = {
  email: profile.email,
  phone: profile.phone,
  timezone: "AEDT (Sydney)",
  location: profile.location,
};

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  handle: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/diwanmalla",
    handle: "@diwanmalla",
    icon: "/icons/github.svg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/diwan-malla/",
    handle: "linkedin.com/in/diwan-malla",
    icon: "/icons/linkedin.svg",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://x.com/diwanmalla",
    handle: "@diwanmalla",
    icon: "/icons/twitter.svg",
  },
];

export interface TerminalCommands {
  [key: string]: string[];
}

export const terminalCommands: TerminalCommands = {
  help: [
    "Available commands:",
    "  about    - Learn about me",
    "  skills   - View my technical skills",
    "  projects - See recent highlights",
    "  contact  - Get my contact info",
    "  chat     - Talk to Diwan's AI digital twin",
    "  clear    - Clear terminal",
  ],
  about: [
    `Hi, I'm ${
      profile.name
    }, a ${profile.title.toLowerCase()} focused on crafting beautiful interfaces.`,
    profile.summary,
  ],
  skills: [
    "Frontend : React 19, Next.js 15, TypeScript, Material UI, Tailwind CSS",
    "Backend  : Node.js, Express, Python (Flask), MongoDB, PostgreSQL",
    "Cloud    : AWS (S3, EC2, Lambda), Vercel, GitHub Actions, CI/CD",
    "AI/ML    : OpenAI APIs, RAG Systems, Upstash Vector",
  ],
  projects: [
    "1. Job Tracker — Full-stack job application management with analytics",
    "2. BrainiX — AI-powered LMS with real-time chat (Led 3-member team)",
    "3. SangeetX — Music streaming platform with admin dashboard",
    "4. PDFly — PDF processing platform (100+ docs daily)",
  ],
  contact: [
    `Email  : ${contactInfo.email}`,
    `LinkedIn: ${socialLinks[1].url}`,
    `GitHub : ${socialLinks[0].url}`,
    `Website: ${profile.website}`,
  ],
};
