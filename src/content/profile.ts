export type SocialId = "github" | "telegram" | "linkedin" | "instagram";

export type Social = { id: SocialId; label: string; href: string };

export const socials: Social[] = [
  { id: "github", label: "GitHub", href: "https://github.com/Avazov03" },
  { id: "telegram", label: "Telegram", href: "https://t.me/Avazov_fit" },
];

export const heroPhoto = {
  src: "/images/avazov-hero.png",
  width: 384,
  height: 512,
};
