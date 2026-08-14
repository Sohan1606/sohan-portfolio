// ============================================================
// SOHAN // SYSTEM — TECHNOLOGY STACK DATA
// Only verified technologies from actual GitHub repositories.
// ============================================================

export type TechLevel = "working" | "building" | "exploring" | "familiar";

export interface TechItem {
  name: string;
  level: TechLevel;
}

export interface TechGroup {
  id: string;
  label: string;
  items: TechItem[];
}

export const stack: TechGroup[] = [
  {
    id: "fullstack",
    label: "Full-Stack",
    items: [
      { name: "TypeScript",    level: "building"   },
      { name: "JavaScript",    level: "building"   },
      { name: "React",         level: "building"   },
      { name: "Next.js",       level: "working"    },
      { name: "Node.js",       level: "building"   },
      { name: "Express",       level: "building"   },
      { name: "FastAPI",       level: "working"    },
      { name: "Python",        level: "working"    },
      { name: "Tailwind CSS",  level: "building"   },
      { name: "Framer Motion", level: "working"    },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Deployment",
    items: [
      { name: "Vercel",         level: "building"  },
      { name: "Render",         level: "working"   },
      { name: "Docker",         level: "working"   },
      { name: "Docker Compose", level: "working"   },
    ],
  },
  {
    id: "ai",
    label: "AI & Agents",
    items: [
      { name: "LangGraph",    level: "working"     },
      { name: "LangChain",    level: "working"     },
      { name: "Groq / Llama", level: "working"     },
      { name: "OpenAI API",   level: "working"     },
    ],
  },
  {
    id: "security",
    label: "Security",
    items: [
      { name: "WebCrypto API (AES-256-GCM)", level: "working" },
      { name: "PBKDF2 / RSA-OAEP",           level: "working" },
      { name: "JWT / bcryptjs",               level: "building" },
      { name: "RBAC",                         level: "working" },
      { name: "Helmet.js",                    level: "working" },
      { name: "Rate Limiting",                level: "working" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      { name: "MongoDB",    level: "building"  },
      { name: "PostgreSQL", level: "working"   },
      { name: "Prisma ORM", level: "working"   },
      { name: "SQLite",     level: "familiar"  },
    ],
  },
];

export const levelDescriptions: Record<TechLevel, string> = {
  building:  "Active use in projects",
  working:   "Competent, have shipped with it",
  exploring: "Currently learning",
  familiar:  "Have worked with it",
};
