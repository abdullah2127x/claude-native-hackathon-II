/**
 * Centralized site configuration for SEO, AEO, and GEO optimization.
 * Acts as the single source of truth across robots, sitemap, metadata, and JSON-LD schemas.
 */

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://taskcortex.vercel.app";
};

export const siteConfig = {
  name: "TaskCortex",
  shortName: "TaskCortex",
  tagline: "AI-Native Task Management & Autonomous Workflow Platform",
  description:
    "TaskCortex is an intelligent, full-stack task management platform. Orchestrate tasks, kanban workflows, and daily productivity using natural language AI copilot, BYOK reasoning, and secure authentication.",
  url: getBaseUrl(),
  ogImage: "/og-image.png",
  author: {
    name: "Abdullah Qureshi",
    role: "Full-Stack & AI Systems Engineer",
    url: "https://abdullah-qureshi.vercel.app",
    github: "https://github.com/abdullahqureshi27",
    linkedin: "https://www.linkedin.com/in/abdullahqureshi27",
    twitter: "https://x.com/abdullahqur27",
    email: "mabdullahqureshi583@gmail.com",
    twitterHandle: "@abdullahqur27",
  },
  repository: "https://github.com/abdullahqureshi27/TaskCortex",
  keywords: [
    "TaskCortex",
    "AI Task Manager",
    "Autonomous Task Assistant",
    "Conversational AI Copilot",
    "Kanban Board",
    "Bring Your Own Key AI",
    "BYOK Task Manager",
    "FastAPI Task Management",
    "Next.js 15 Todo App",
    "Better Auth Todo Application",
    "Abdullah Qureshi",
    "Full-Stack AI Productivity",
    "Interactive Kanban Workflow",
    "Task Automation",
  ],
  locale: "en_US",
};
