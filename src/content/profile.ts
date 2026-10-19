export type SocialId = "github" | "telegram" | "linkedin" | "instagram";

export type Social = { id: SocialId; label: string; href: string; handle: string };

export const siteUrl = "https://avazoff.zonic.fit";

export const contact = {
  email: "avazovogabek86@gmail.com",
  telegram: "https://t.me/Avazov_fit",
  telegramHandle: "@Avazov_fit",
  github: "https://github.com/Avazov03",
  githubHandle: "Avazov03",
};

export const socials: Social[] = [
  { id: "github", label: "GitHub", href: contact.github, handle: contact.githubHandle },
  { id: "telegram", label: "Telegram", href: contact.telegram, handle: contact.telegramHandle },
];

export const heroPhoto = {
  src: "/images/avazov-hero.png",
  width: 384,
  height: 512,
};

export const stack = [
  { key: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Three.js"] },
  { key: "backend", items: ["Node.js", "Express", "Fastify", "Python", "FastAPI", "PHP", "Laravel"] },
  { key: "data", items: ["PostgreSQL", "PostGIS", "MySQL", "Redis", "Prisma", "Sequelize", "SQLite"] },
  { key: "ai", items: ["LangChain", "LangGraph", "RAG", "FAISS", "ChromaDB", "OpenAI", "Gemini", "Vapi"] },
  { key: "ops", items: ["Docker", "Nginx", "PM2", "AWS Lightsail", "Let’s Encrypt", "Playwright", "Jest", "k6"] },
] as const;

export type StackKey = (typeof stack)[number]["key"];
