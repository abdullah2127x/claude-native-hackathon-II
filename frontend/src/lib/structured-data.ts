import { siteConfig } from "./site-config";

/**
 * Returns complete Schema.org JSON-LD structured data for:
 * - SoftwareApplication (TaskCortex web app details, category, offers, features)
 * - Organization & Person (Author entity authority, LinkedIn, GitHub, Portfolio)
 * - WebSite (Canonical web presence and search association)
 * - FAQPage (Answer Engine Optimization for Perplexity, ChatGPT Search, Gemini AI Overviews)
 */
export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        alternateName: ["Task Cortex", "TaskCortex AI"],
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web Browser, iOS, Android, macOS, Windows, Linux",
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        description: siteConfig.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Conversational AI Task Copilot using natural language",
          "Bring Your Own Key (BYOK) multi-model reasoning engine (Mistral, Groq, OpenRouter)",
          "Client-side zero-knowledge AES-256 Fernet API key vault",
          "Interactive Kanban boards with dynamic priority grouping and status updates",
          "Better Auth stateless JWT authentication with secure session management",
          "Mobile-first responsive glassmorphism UI with dark and light theme support",
        ],
        author: {
          "@id": `${siteConfig.url}/#author`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        founder: {
          "@id": `${siteConfig.url}/#author`,
        },
        sameAs: [
          siteConfig.repository,
          siteConfig.author.github,
          siteConfig.author.linkedin,
          siteConfig.author.twitter,
          siteConfig.author.url,
        ],
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#author`,
        name: siteConfig.author.name,
        jobTitle: siteConfig.author.role,
        url: siteConfig.author.url,
        sameAs: [
          siteConfig.author.url,
          siteConfig.author.linkedin,
          siteConfig.author.twitter,
          siteConfig.author.github,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} — ${siteConfig.tagline}`,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        author: {
          "@id": `${siteConfig.url}/#author`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is TaskCortex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TaskCortex is an AI-native task management and autonomous workflow platform designed to streamline daily productivity. It combines an interactive Kanban board with a conversational AI copilot to manage, organize, and prioritize tasks using natural language.",
            },
          },
          {
            "@type": "Question",
            name: "How does the AI Copilot work in TaskCortex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The TaskCortex AI Copilot allows users to interact conversationally with their task board. You can create new tasks, update statuses, set priorities, search your backlog, and plan workflows entirely through natural language commands in the chat drawer.",
            },
          },
          {
            "@type": "Question",
            name: "What is Bring Your Own Key (BYOK) architecture in TaskCortex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TaskCortex supports BYOK, enabling users to connect their own LLM API keys (such as Mistral, Groq, or OpenRouter). User keys are protected with zero-knowledge AES-256 Fernet symmetric encryption at rest in the database.",
            },
          },
          {
            "@type": "Question",
            name: "What tech stack powers TaskCortex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TaskCortex is built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Shadcn UI on the frontend, alongside a high-throughput Python FastAPI backend, Neon PostgreSQL with SQLModel, and Better Auth authentication.",
            },
          },
          {
            "@type": "Question",
            name: "Who developed TaskCortex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TaskCortex was designed and developed by Abdullah Qureshi, a Full-Stack and AI Systems Engineer specializing in modern web applications, agentic workflows, and cloud architecture.",
            },
          },
        ],
      },
    ],
  };
}
