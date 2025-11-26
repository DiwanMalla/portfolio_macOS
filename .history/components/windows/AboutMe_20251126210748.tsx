"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Target,
  Rocket,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left mb-3 group"
      >
        {isOpen ? (
          <ChevronDown size={18} className="text-blue-500" />
        ) : (
          <ChevronRight size={18} className="text-blue-500" />
        )}
        <span className="text-blue-500">{icon}</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">
          {title}
        </h2>
      </button>
      {isOpen && <div className="pl-7">{children}</div>}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full mr-2 mb-2">
      {children}
    </span>
  );
}

function SkillBadge({
  children,
  level,
}: {
  children: React.ReactNode;
  level: "expert" | "advanced" | "intermediate";
}) {
  const colors = {
    expert:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
    advanced:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    intermediate:
      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full mr-2 mb-2 border ${colors[level]}`}
    >
      {children}
    </span>
  );
}

export default function AboutMe() {
  const profile = {
    personal: {
      name: "Diwan Malla",
      title: "Full-Stack Developer",
      location: "Sydney, Australia",
      summary:
        "Full Stack developer specializing in React.js, Material UI, and UX-driven design. Certified IBM Full Stack Development and Meta Front-End Specialization. Experienced in building responsive web applications, improving UI performance, and collaborating with cross-functional teams to deliver exceptional digital experiences.",
      elevator_pitch:
        "Hi, I'm Diwan, a Full-Stack Developer focused on creating high-performance, intuitive user interfaces and AI-powered web applications. I combine strong front-end skills with backend expertise to deliver scalable and efficient solutions.",
      contact: {
        phone: "+61-0452140630",
        email: "malladipin@gmail.com",
        linkedin: "https://www.linkedin.com/in/diwanmalla/",
        github: "https://github.com/diwanmalla",
        portfolio: "https://www.diwanmalla.com.au",
      },
    },
    salary_location: {
      current_salary: "$85,000 - $95,000 AUD",
      salary_expectations: {
        mid_level_roles: "$95,000 - $115,000 AUD",
        senior_roles: "$115,000 - $135,000 AUD",
        note: "Open to discussing compensation based on role complexity, growth opportunities, and technology stack",
      },
      location_preferences: [
        "Sydney CBD",
        "Remote",
        "Hybrid",
        "Newcastle",
        "Central Coast",
        "Brisbane",
        "Gold Coast",
        "Canberra",
      ],
      relocation_willing: true,
      relocation_details: "Open to relocation within Australia for the right opportunity with relocation support",
      remote_experience:
        "3+ years remote collaboration experience across distributed teams",
      remote_setup: "Professional home office setup with high-speed internet, dedicated workspace",
      travel_availability: "Available for interstate travel up to 25%, flexible for team collaboration",
      work_authorization: "International student, immediate to work, happy to volunteer",
      start_availability: "Immediate, happy to volunteer",
    },
    experience: [
      {
        company: "Barnamala Tech",
        title: "Full-Stack Developer",
        duration: "Feb 2025 – Present",
        company_context: "Tech startup focusing on SaaS applications and UX-driven web solutions",
        highlights: [
          "Enhanced load speed by 35%, improved user satisfaction by 28%",
          "Reduced deployment time by 40% (4h → 2.4h), eliminated 95% of deployment bugs",
          "Reduced component development time by 50% through reusable component library",
          "Mentored 2 junior developers on React best practices and TypeScript patterns",
          "Enabled 3 deployments per day capacity, freed 10 hours per week of developer time",
        ],
        technologies: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Material UI v6",
          "Python Flask",
          "MongoDB",
          "AWS",
          "GitHub Actions",
          "Storybook",
          "Jest",
        ],
      },
      {
        company: "Hamro Chautari",
        title: "Junior Web Developer",
        duration: "April 2023 – Nov 2024",
        company_context: "Client-focused web development and SaaS solutions",
        highlights: [
          "Boosted engagement by 25%, reduced initial load time by 40%",
          "Improved Lighthouse score from 65 to 92",
          "Optimized database queries (3s to 0.5s response time)",
          "Implemented Redis caching for frequently accessed data",
          "Positive feedback from 85% of surveyed users",
        ],
        technologies: [
          "React 18",
          "Next.js 14",
          "Tailwind CSS",
          "Node.js",
          "Express",
          "PostgreSQL",
          "AWS EC2",
          "Vercel",
          "Redis",
        ],
      },
      {
        company: "Bihani Tech",
        title: "Front-End Web Developer",
        duration: "Sep 2021 – Aug 2022",
        company_context: "Local web development projects and WordPress customizations",
        highlights: [
          "Improved UI satisfaction by 35%",
          "Built responsive React.js and Bootstrap applications",
          "Customized WordPress sites for clients",
        ],
        technologies: ["JavaScript", "React.js", "Bootstrap", "WordPress", "HTML5", "CSS3", "REST APIs"],
      },
      {
        company: "Adira Tech",
        title: "Web Developer Intern",
        duration: "Nov 2020 – Jul 2021",
        highlights: [
          "Debugged UI issues and supported Agile development",
          "Built small internal projects using JavaScript and Bootstrap",
          "Improved front-end stability and gained hands-on Agile experience",
        ],
        technologies: ["JavaScript", "React.js", "Bootstrap", "WordPress", "Git"],
      },
    ],
    projects: [
      {
        name: "Job Tracker",
        description:
          "Full-stack job tracking platform with analytics dashboard, secure document management, and public sharing",
        technologies: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Vercel Blob", "NextAuth.js"],
        impact: "10+ active users, streamlined resume/cover letter management",
        link: "https://job-tracker-zeta-wheat.vercel.app",
      },
      {
        name: "GenZ Memories",
        description:
          "Social video platform for preserving Gen Z activism through short-form videos and storytelling",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Cloudinary", "Socket.io"],
        impact: "Archive voices of change with real-time notifications & chat",
        link: "https://genz-memories.vercel.app",
      },
      {
        name: "PDFly",
        description: "Smart PDF management platform for compress, merge, split, convert, and secure PDFs",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "PDF-Lib", "Sharp"],
        impact: "100+ documents processed daily, 45% improved user satisfaction",
        link: "https://pdf-fast-fly.vercel.app/",
      },
      {
        name: "BrainiX",
        description: "AI-powered e-learning platform with personalized learning, smart assessments, and Stripe payments",
        technologies: ["Next.js 14", "React", "TypeScript", "OpenAI APIs", "Pusher", "Stripe", "Clerk"],
        impact: "Led 3-member team, 300% engagement increase, 94.7% course completion rate",
        link: "https://braini-x-one.vercel.app",
      },
      {
        name: "SangeetX",
        description: "Modern music streaming platform with admin dashboard and guest experience",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Clerk", "Cloudinary"],
        impact: "50+ users, 60% reduced admin time, 50% faster media loading",
        link: "https://www.sangeetx.online",
      },
      {
        name: "ChatSphere",
        description: "Real-time chat application with private messaging, group chats, and media sharing",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
        impact: "Real-time messaging with online/offline status indication",
        link: "https://chatsphere-p8zu.onrender.com",
      },
      {
        name: "SmartSpend",
        description: "Budget tracker with transaction management, category insights, and interactive visualizations",
        technologies: ["Next.js", "TypeScript", "Prisma", "TanStack Query", "Recharts", "Clerk"],
        impact: "Simplified personal finance management with elegant UI",
        link: "https://smartspend-budget.vercel.app/",
      },
      {
        name: "My Weather App (Mausam)",
        description: "Real-time weather app with interactive charts, search history, and city favorites",
        technologies: ["Next.js", "React.js", "TypeScript", "TanStack Query", "Shadcn UI", "Recharts"],
        impact: "Clean responsive UI with dark/light mode",
        link: "https://mausam-weather.vercel.app/",
      },
    ],
    skills: {
      expert: [
        "React 19",
        "Next.js 15",
        "TypeScript",
        "JavaScript ES6+",
        "Node.js",
        "Material UI",
        "Tailwind CSS",
      ],
      advanced: [
        "PostgreSQL",
        "MongoDB",
        "AWS (S3, EC2, Lambda)",
        "CI/CD",
        "GitHub Actions",
        "REST APIs",
        "Python",
        "Express",
      ],
      intermediate: ["Flask", "Redux", "Zustand", "Design Systems", "Docker", "Redis"],
      learning: ["C#", ".NET", "Angular", "System Architecture", "AI/ML Integration", "LangChain"],
    },
    soft_skills: [
      "Agile workflow (Scrum, Kanban)",
      "UX research & Wireframing",
      "Cross-functional collaboration",
      "Technical mentoring",
      "Code reviews",
      "Documentation",
    ],
    education: {
      bachelor: {
        university: "Victoria University Sydney",
        degree: "Bachelor of Information Technology",
        graduation_year: 2025,
        details: "HD 82% - 6.67/7 GPA",
      },
      masters: {
        university: "Sydney Met",
        degree: "Master of Information Technology",
        major: "Data Science",
        years: "2026-2028",
      },
    },
    certifications: [
      { name: "IBM Full Stack Developer", issuer: "IBM", year: 2024, skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs"] },
      { name: "Meta Front-End Specialization", issuer: "Meta", year: 2024, skills: ["React", "JavaScript", "HTML/CSS", "UI/UX", "Responsive Design"] },
    ],
    professional_development: {
      recent_learning: [
        "Advanced React patterns (Server Components, Suspense, Streaming)",
        "Next.js 15 features (App Router, Server Actions, Partial Prerendering)",
        "AI API integrations (OpenAI, Groq, Vector databases)",
        "RAG systems with Upstash Vector",
      ],
      currently_learning: "AI/ML integration patterns and LangChain framework",
      learning_agility: [
        "Next.js 13 App Router: Production-ready in 2 weeks",
        "TypeScript: Became team expert in 6 weeks",
        "OpenAI RAG system: Built in 3 weeks for BrainiX",
        "Material UI: Mastered in 4 weeks, created component library",
      ],
    },
    career_goals: {
      current_level: "Mid-Level Full-Stack Developer (4+ years experience)",
      target: "Senior Developer or Technical Lead within 2-3 years",
      short_term: "Mid to Senior Full-Stack Developer role focusing on React/Next.js ecosystem, SaaS platforms, and AI-powered web applications",
      long_term: "Technical Lead, Engineering Manager, or Head of Engineering in an AI/ML driven SaaS company",
      ideal_roles: ["Senior Full-Stack Developer", "Technical Lead (React/Node.js)", "AI Integration Engineer"],
      interests: ["SaaS", "AI/ML", "Enterprise", "FinTech", "EdTech"],
      open_to_learning: "Willing to learn C#/.NET/Angular for the right role with mentorship support",
    },
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
            DM
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {profile.personal.name}
            </h1>
            <p className="text-xl text-white/90 font-medium">
              {profile.personal.title}
            </p>
            <div className="flex items-center gap-2 mt-1 text-white/80">
              <MapPin size={14} />
              <span className="text-sm">{profile.personal.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <a
            href={`mailto:${profile.personal.contact.email}`}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
          >
            <Mail size={16} className="text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {profile.personal.contact.email}
            </span>
          </a>
          <a
            href={`tel:${profile.personal.contact.phone}`}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
          >
            <Phone size={16} className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {profile.personal.contact.phone}
            </span>
          </a>
          <a
            href={profile.personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
          >
            <Linkedin size={16} className="text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300">LinkedIn</span>
          </a>
          <a
            href={profile.personal.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
          >
            <Github size={16} className="text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">GitHub</span>
          </a>
          <a
            href={profile.personal.contact.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
          >
            <Globe size={16} className="text-purple-500" />
            <span className="text-gray-700 dark:text-gray-300">Portfolio</span>
          </a>
        </div>

        {/* Summary */}
        <CollapsibleSection
          title="About Me"
          icon={<User size={20} />}
          defaultOpen={true}
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {profile.personal.elevator_pitch}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {profile.personal.summary}
          </p>
        </CollapsibleSection>

        {/* Skills */}
        <CollapsibleSection
          title="Technical Skills"
          icon={<Code size={20} />}
          defaultOpen={true}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                🏆 Expert
              </h4>
              <div className="flex flex-wrap">
                {profile.skills.expert.map((skill) => (
                  <SkillBadge key={skill} level="expert">
                    {skill}
                  </SkillBadge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                🚀 Advanced
              </h4>
              <div className="flex flex-wrap">
                {profile.skills.advanced.map((skill) => (
                  <SkillBadge key={skill} level="advanced">
                    {skill}
                  </SkillBadge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                💪 Intermediate
              </h4>
              <div className="flex flex-wrap">
                {profile.skills.intermediate.map((skill) => (
                  <SkillBadge key={skill} level="intermediate">
                    {skill}
                  </SkillBadge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                📚 Currently Learning
              </h4>
              <div className="flex flex-wrap">
                {profile.skills.learning.map((skill) => (
                  <span key={skill} className="inline-block px-2.5 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full mr-2 mb-2 border border-purple-300 dark:border-purple-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Experience */}
        <CollapsibleSection
          title="Work Experience"
          icon={<Briefcase size={20} />}
          defaultOpen={true}
        >
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.duration}
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1 mb-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Projects */}
        <CollapsibleSection
          title="Featured Projects"
          icon={<Rocket size={20} />}
          defaultOpen={false}
        >
          <div className="grid gap-4">
            {profile.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-xs flex items-center gap-1"
                    >
                      <Globe size={12} />
                      Live
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {project.description}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">
                  📈 {project.impact}
                </p>
                <div className="flex flex-wrap">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Education & Certifications */}
        <CollapsibleSection
          title="Education & Certifications"
          icon={<GraduationCap size={20} />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            {/* Bachelor's Degree */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {profile.education.bachelor.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                {profile.education.bachelor.university}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Class of {profile.education.bachelor.graduation_year}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                🎓 {profile.education.bachelor.details}
              </p>
            </div>
            {/* Master's Degree */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full">
                  Upcoming
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {profile.education.masters.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                {profile.education.masters.university}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Major: {profile.education.masters.major} • {profile.education.masters.years}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Certifications
              </h4>
              <div className="space-y-3">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award size={16} className="text-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {cert.name}
                      </span>
                      <span className="text-sm text-gray-500">({cert.year})</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                      Issued by {cert.issuer}
                    </p>
                    <div className="flex flex-wrap mt-2 pl-6">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded mr-1 mb-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Salary & Location */}
        <CollapsibleSection
          title="Availability & Expectations"
          icon={<DollarSign size={20} />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Mid-Level Roles
                </h4>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {profile.salary_location.salary_expectations.mid_level_roles}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Senior Roles
                </h4>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {profile.salary_location.salary_expectations.senior_roles}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              💡 {profile.salary_location.salary_expectations.note}
            </p>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Location Preferences
              </h4>
              <div className="flex flex-wrap">
                {profile.salary_location.location_preferences.map((loc) => (
                  <Badge key={loc}>{loc}</Badge>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p>✅ <span className="font-medium">Work Authorization:</span> {profile.salary_location.work_authorization}</p>
              <p>🚀 <span className="font-medium">Start Date:</span> {profile.salary_location.start_availability}</p>
              <p>💻 <span className="font-medium">Remote Experience:</span> {profile.salary_location.remote_experience}</p>
              <p>🏠 <span className="font-medium">Setup:</span> {profile.salary_location.remote_setup}</p>
              <p>✈️ <span className="font-medium">Travel:</span> {profile.salary_location.travel_availability}</p>
              <p>🌏 <span className="font-medium">Relocation:</span> {profile.salary_location.relocation_details}</p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Professional Development */}
        <CollapsibleSection
          title="Professional Development"
          icon={<Rocket size={20} />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                🎯 Currently Learning
              </h4>
              <p className="text-gray-700 dark:text-gray-300 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                {profile.professional_development.currently_learning}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                📚 Recent Learning
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                {profile.professional_development.recent_learning.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                ⚡ Learning Agility (Proven Track Record)
              </h4>
              <div className="grid gap-2">
                {profile.professional_development.learning_agility.map((item, i) => (
                  <div key={i} className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm text-gray-700 dark:text-gray-300">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Soft Skills */}
        <CollapsibleSection
          title="Soft Skills & Collaboration"
          icon={<User size={20} />}
          defaultOpen={false}
        >
          <div className="flex flex-wrap">
            {profile.soft_skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </CollapsibleSection>

        {/* Career Goals */}
        <CollapsibleSection
          title="Career Goals"
          icon={<Target size={20} />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Current Level:</span>{" "}
                {profile.career_goals.current_level}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Target:</span>{" "}
                {profile.career_goals.target}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-semibold">Short-term:</span>{" "}
                {profile.career_goals.short_term}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-semibold">Long-term:</span>{" "}
                {profile.career_goals.long_term}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Ideal Roles
              </h4>
              <div className="flex flex-wrap">
                {profile.career_goals.ideal_roles.map((role) => (
                  <span key={role} className="inline-block px-3 py-1.5 text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full mr-2 mb-2">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Industries of Interest
              </h4>
              <div className="flex flex-wrap">
                {profile.career_goals.interests.map((industry) => (
                  <Badge key={industry}>{industry}</Badge>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              💡 {profile.career_goals.open_to_learning}
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
