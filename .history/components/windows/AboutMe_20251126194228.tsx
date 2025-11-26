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
      remote_experience:
        "3+ years remote collaboration experience across distributed teams",
      work_authorization: "Australian Citizen / Permanent Resident",
      start_availability: "2-4 weeks notice period",
    },
    experience: [
      {
        company: "Barnamala Tech",
        title: "Full-Stack Developer",
        duration: "Feb 2025 – Present",
        highlights: [
          "Enhanced load speed by 35%, improved user satisfaction by 28%",
          "Reduced deployment time by 40%, eliminated 95% of deployment bugs",
          "Mentored 2 junior developers on React best practices",
        ],
        technologies: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Material UI",
          "Python Flask",
          "MongoDB",
          "AWS",
        ],
      },
      {
        company: "Hamro Chautari",
        title: "Junior Web Developer",
        duration: "April 2023 – Nov 2024",
        highlights: [
          "Boosted engagement by 25%, reduced load time by 40%",
          "Improved Lighthouse score from 65 to 92",
          "Optimized database queries (3s to 0.5s response time)",
        ],
        technologies: [
          "React 18",
          "Next.js 14",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "AWS",
        ],
      },
      {
        company: "Bihani Tech",
        title: "Front-End Web Developer",
        duration: "Sep 2021 – Aug 2022",
        highlights: [
          "Improved UI satisfaction by 35%",
          "Built responsive React.js applications",
          "Customized WordPress sites",
        ],
        technologies: ["JavaScript", "React.js", "Bootstrap", "WordPress"],
      },
      {
        company: "Adira Tech",
        title: "Web Developer Intern",
        duration: "Nov 2020 – Jul 2021",
        highlights: [
          "Debugged UI issues and supported Agile development",
          "Built internal projects with JavaScript",
          "Gained hands-on experience with version control",
        ],
        technologies: ["JavaScript", "Bootstrap", "Git"],
      },
    ],
    projects: [
      {
        name: "Job Tracker",
        description:
          "Full-stack job tracking platform with analytics dashboard and secure document management",
        technologies: ["Next.js 15", "PostgreSQL", "Vercel Blob", "React"],
        impact: "Served 10+ active users",
      },
      {
        name: "PDFly",
        description: "PDF APIs for secure processing and file encryption",
        technologies: ["Python", "React"],
        impact: "100+ documents processed daily",
      },
      {
        name: "SangeetX",
        description: "Music streaming platform with admin dashboard",
        technologies: ["Next.js", "TypeScript", "Cloudinary"],
        impact: "50+ users, 60% reduced admin time",
      },
      {
        name: "BrainiX",
        description: "AI-powered LMS with real-time chat and Stripe payments",
        technologies: ["Next.js", "OpenAI APIs", "Pusher", "Stripe"],
        impact: "300% engagement increase, 94.7% completion rate",
      },
    ],
    skills: {
      expert: [
        "React 19",
        "Next.js 15",
        "TypeScript",
        "Node.js",
        "Material UI",
        "Tailwind CSS",
      ],
      advanced: ["PostgreSQL", "MongoDB", "AWS", "CI/CD", "REST APIs", "Python"],
      intermediate: ["Flask", "Redux", "Design Systems", "Docker"],
    },
    education: {
      university: "Victoria University Sydney",
      degree: "Bachelor of Information Technology",
      graduation_year: 2025,
    },
    certifications: [
      { name: "IBM Full Stack Developer", year: 2024 },
      { name: "Meta Front-End Specialization", year: 2023 },
    ],
    career_goals: {
      current_level: "Mid-Level Full-Stack Developer (4+ years)",
      target: "Senior Developer or Technical Lead within 2-3 years",
      interests: ["SaaS", "AI/ML", "Enterprise", "FinTech", "EdTech"],
    },
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6 text-white">
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
                Expert
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
                Advanced
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
                Intermediate
              </h4>
              <div className="flex flex-wrap">
                {profile.skills.intermediate.map((skill) => (
                  <SkillBadge key={skill} level="intermediate">
                    {skill}
                  </SkillBadge>
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
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {project.name}
                </h3>
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
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {profile.education.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                {profile.education.university}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Class of {profile.education.graduation_year}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Certifications
              </h4>
              <div className="space-y-2">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {cert.name}
                    </span>
                    <span className="text-sm text-gray-500">({cert.year})</span>
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
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>
                ✅ {profile.salary_location.work_authorization}
              </p>
              <p>
                🕐 {profile.salary_location.start_availability}
              </p>
              <p>
                💻 {profile.salary_location.remote_experience}
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Career Goals */}
        <CollapsibleSection
          title="Career Goals"
          icon={<Target size={20} />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Current Level:</span>{" "}
                {profile.career_goals.current_level}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-semibold">Target:</span>{" "}
                {profile.career_goals.target}
              </p>
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
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
