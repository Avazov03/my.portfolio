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
            data-cursor-grow
            className="flex size-7 items-center justify-center rounded-full bg-chip text-stage-edge transition-[background-color,color,transform] duration-300 hover:scale-110 hover:bg-gold hover:text-black"
          >
            <SocialIcon id={social.id} className="size-3.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
