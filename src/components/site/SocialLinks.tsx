import { socials } from "@/content/profile";
import { SocialIcon } from "./icons";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="flex size-7 items-center justify-center rounded-full bg-chip text-stage-edge transition-colors duration-200 hover:bg-gold"
          >
            <SocialIcon id={social.id} className="size-3.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
