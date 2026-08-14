// ============================================================
// SOHAN // SYSTEM — PROJECT DATA
// All facts verified from actual GitHub repositories.
// Nothing invented.
// ============================================================

export type ProjectTier = "best" | "selected" | "lab";
export type ProjectStatus = "deployed" | "in-progress" | "archived";

export interface Technology {
  name: string;
  category: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  tier: ProjectTier;
  status: ProjectStatus;
  type: string;
  github: string;
  live?: string;
  problem: string;
  approach: string;
  architecture?: string;
  engineeringNotes?: string[];
  security?: string;
  deployment?: string;
  tech: string[];
  featured: boolean;
}

export const projects: Project[] = [
  // ============================================================
  // TIER 1 — BEST WORK
  // ============================================================
  {
    id: "lastkey",
    number: "01",
    name: "LastKey Digital Legacy",
    tagline: "Zero-knowledge digital legacy platform with dual-portal architecture.",
    tier: "best",
    status: "deployed",
    type: "Full-Stack Platform",
    github: "https://github.com/Sohan1606/lastkey-digital-legacy",
    live: "https://lastkey-digital-legacy.vercel.app",
    problem:
      "Digital legacy platforms typically store sensitive data on servers in plaintext or with server-side encryption — meaning the platform itself can access what you store. For something as sensitive as passwords, legal documents, and final messages, that is not acceptable.",
    approach:
      "Build a dual-portal platform where the server never sees plaintext data. The owner encrypts everything client-side before it reaches the server. Beneficiaries receive access only after the owner's Guardian Protocol triggers — and only decrypt data locally using their own secret.",
    architecture:
      "Owner Portal and Beneficiary Portal are separated by design. Authentication is independent. Access is scoped and gated. The Guardian Protocol monitors inactivity and triggers the legacy delivery workflow via scheduled jobs and Socket.IO real-time updates.",
    engineeringNotes: [
      "Data Encryption Key (DEK) is a random 256-bit AES key generated per owner — the server stores only ciphertext.",
      "DEK is wrapped using a Key Encryption Key (KEK) derived from the owner's password via PBKDF2 with 100,000 iterations.",
      "Beneficiary DEK sharing uses RSA-OAEP: owner encrypts DEK with beneficiary's RSA public key. Beneficiary decrypts locally using their RSA private key, which is itself encrypted with their personal unlock secret.",
      "OTP-based beneficiary authentication with JWT sessions scoped to permitted vault contents.",
    ],
    security:
      "Zero-knowledge: the server stores only ciphertext. AES-256-GCM, PBKDF2, RSA-OAEP all run client-side via WebCrypto API. Rate limiting and Helmet applied server-side.",
    deployment:
      "Frontend deployed on Vercel. Backend on Node.js with Express. MongoDB as the primary database. Redis optional (falls back to node-cron). Feature flags gate Stripe and OpenAI integrations.",
    tech: [
      "React 19", "Node.js", "Express", "MongoDB", "Socket.IO",
      "WebCrypto API", "AES-256-GCM", "PBKDF2", "RSA-OAEP",
      "JWT", "bcryptjs", "Framer Motion", "Tailwind CSS",
      "OpenAI TTS", "Stripe", "PostHog", "Nodemailer", "Vercel",
    ],
    featured: true,
  },
  {
    id: "fairloop",
    number: "02",
    name: "FairLoop",
    tagline: "Adversarial AI auditor for enterprise performance reviews — built at InnovaHack.",
    tier: "best",
    status: "deployed",
    type: "Multi-Agent AI System",
    github: "https://github.com/Sohan1606/fairloop",
    live: "https://fairloop.vercel.app",
    problem:
      "Performance reviews are routinely affected by cognitive bias — recency bias, halo effect, horns effect, language bias — without employees having any visibility or recourse. Existing tools help managers write reviews but do nothing to challenge their fairness.",
    approach:
      "Build a 5-agent adversarial pipeline that audits reviews like an independent defense layer — not a writing assistant. Each agent has a distinct role in the pipeline. High-bias reviews are blocked until HR approves. Employees can formally dispute unfair claims with an evidence trail.",
    engineeringNotes: [
      "5-agent pipeline: Data Collection → Evidence Analysis → Bias Detection → Report Generation → Approval Routing.",
      "Live writing assistant detects bias in real time as managers type.",
      "Evidence grounding: every manager claim cross-referenced against peer feedback before the review proceeds.",
      "SHA-256 tamper-proof audit certificates generated with ReportLab.",
      "Pay equity scanner compares rating patterns across gender and department dimensions.",
    ],
    security:
      "SHA-256 tamper-proof PDF audit certificates for legal compliance. Audit trail logged for all system activity.",
    deployment:
      "Python FastAPI backend with LangGraph agent orchestration. Next.js frontend. Deployed on Vercel. Built for InnovaHack Chapter 1 Round 2, Agentic AI Domain.",
    tech: [
      "Python", "FastAPI", "LangGraph", "LangChain",
      "Groq", "Llama 3.3 70B", "Next.js", "TypeScript",
      "Tailwind CSS", "SQLite", "ReportLab", "Recharts", "Vercel",
    ],
    featured: true,
  },
  {
    id: "cloud-complaint",
    number: "03",
    name: "Cloud Complaint System",
    tagline: "Cloud-native complaint management deployed across Render and Vercel.",
    tier: "best",
    status: "deployed",
    type: "Cloud-Native Full-Stack App",
    github: "https://github.com/Sohan1606/cloud-complaint-system",
    live: "https://cloud-complaint-system.vercel.app",
    problem:
      "Build a complaint management system that is genuinely cloud-native — not just a web app deployed to a cloud host, but one designed around cloud deployment patterns from the start.",
    approach:
      "Separate frontend and backend deployments across different cloud platforms. Use PostgreSQL with Prisma ORM for type-safe database access. Docker Compose for reproducible local development. Cloudinary for CDN-backed image storage.",
    engineeringNotes: [
      "Backend deployed on Render. Frontend deployed on Vercel. Split-platform cloud architecture.",
      "Docker Compose provides a self-contained local PostgreSQL environment — no local DB setup required.",
      "Prisma ORM for type-safe query building and migration management.",
      "Cloudinary handles image uploads with CDN delivery.",
      "Rate limiting and Helmet applied for baseline API security.",
    ],
    security: "JWT authentication, Helmet.js security headers, API rate limiting.",
    deployment:
      "Render Web Service for Node.js/Express backend. Vercel for React frontend. PostgreSQL via Render Database. Docker Compose for local development.",
    tech: [
      "React 18", "Node.js", "Express", "PostgreSQL",
      "Prisma", "Docker", "Docker Compose", "Cloudinary",
      "JWT", "Helmet", "Tailwind CSS", "Render", "Vercel",
    ],
    featured: true,
  },

  // ============================================================
  // TIER 2 — SELECTED SYSTEMS
  // ============================================================
  {
    id: "sentra",
    number: "04",
    name: "Sentra",
    tagline: "MERN incident reporting and response platform for educational institutions.",
    tier: "selected",
    status: "deployed",
    type: "Full-Stack Platform",
    github: "https://github.com/Sohan1606/sentra-incident-dashboard",
    problem:
      "Educational institutions lack a structured, role-aware system for incident reporting that separates the concerns of reporting, investigation, and administration.",
    approach:
      "MERN-based platform with role-based access control for students, staff, and administrators. Each role sees a different interface and has different capabilities.",
    engineeringNotes: [
      "Role-based access: students, staff, and admins each have scoped access to reports and management tools.",
      "Secure anonymous reporting with status tracking for all submitted incidents.",
      "Admin management dashboard for case assignment, escalation, and resolution.",
      "Awareness hub for policies, helplines, and institutional safety resources.",
    ],
    security: "JWT authentication. Role-based access control for all endpoints.",
    tech: [
      "MongoDB", "Express", "React", "Node.js",
      "JWT", "React Router",
    ],
    featured: false,
  },
  {
    id: "qmeet",
    number: "05",
    name: "QMeet",
    tagline: "Autonomous meeting intelligence with 6 AI agents.",
    tier: "selected",
    status: "in-progress",
    type: "Multi-Agent AI System",
    github: "https://github.com/Sohan1606/qmeet-hackathon",
    problem: "Meetings generate more information than participants can process and act on.",
    approach:
      "6-agent autonomous pipeline for meeting intelligence. Built as a hackathon project.",
    tech: ["TypeScript"],
    featured: false,
  },

  // ============================================================
  // TIER 3 — LAB
  // ============================================================
  {
    id: "hh-goa",
    number: "06",
    name: "HH Goa PFP Generator",
    tagline: "Profile frame generator built as a HackerHouse Goa 2026 shortlisting task.",
    tier: "lab",
    status: "deployed",
    type: "Hackathon Tool",
    github: "https://github.com/Sohan1606/hh-goa-2026-pfp",
    live: "https://hh-goa-2026-pfp.vercel.app",
    problem: "Build a profile picture frame generator as a shortlisting task for HackerHouse Goa 2026.",
    approach: "Next.js TypeScript application. Fast delivery, clean output.",
    tech: ["Next.js", "TypeScript", "Vercel"],
    featured: false,
  },
  {
    id: "ai-product-gen",
    number: "07",
    name: "AI Product Generator",
    tagline: "AI-powered digital product generator.",
    tier: "lab",
    status: "deployed",
    type: "AI Tool",
    github: "https://github.com/Sohan1606/ai-product-generator",
    live: "https://ai-product-generator-khaki.vercel.app",
    problem: "Experiment with AI-powered product generation.",
    approach: "TypeScript application deployed on Vercel.",
    tech: ["TypeScript", "Vercel"],
    featured: false,
  },
  {
    id: "financial-mirror",
    number: "08",
    name: "Financial Mirror AI",
    tagline: "Full-stack financial analysis web application with CSV-based data input.",
    tier: "lab",
    status: "in-progress",
    type: "Full-Stack Tool",
    github: "https://github.com/Sohan1606/financial-mirror-ai",
    problem: "Provide a simple interface for personal financial analysis from CSV transaction exports.",
    approach: "Full-stack JavaScript application with structured CSV parsing and analysis.",
    tech: ["JavaScript", "Node.js"],
    featured: false,
  },
];

export const bestWork    = projects.filter(p => p.tier === "best");
export const selected    = projects.filter(p => p.tier === "selected");
export const labProjects = projects.filter(p => p.tier === "lab");
