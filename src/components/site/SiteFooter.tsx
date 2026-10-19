import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { contact } from "@/content/profile";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getNavItems } from "./nav";
import { SocialLinks } from "./SocialLinks";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const items = getNavItems(locale, dict.nav);
  return (
    <footer className="bg-surface pt-16 pb-10 lg:pt-20">
      <Container>
        <p
          aria-hidden="true"
          className="text-[clamp(64px,21vw,300px)] leading-[0.8] font-extrabold tracking-[-0.04em] text-ink uppercase select-none"
        >
          {dict.brand.wordmark}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <nav aria-label={dict.footer.navLabel} className="lg:col-span-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
              {items.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-ink-soft transition-colors duration-200 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4 text-sm lg:col-span-3">
            <a href={`mailto:${contact.email}`} className="text-ink transition-colors duration-200 hover:text-gold">
              {contact.email}
            </a>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors duration-200 hover:text-gold"
            >
              Telegram {contact.telegramHandle}
            </a>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-3 lg:items-end">
            <SocialLinks />
            <LanguageSwitcher current={locale} label={dict.nav.language} />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 text-xs text-muted">
          <p>
            © 2026 {dict.hero.photoAlt}. {dict.footer.rights}
          </p>
          <p>{dict.footer.made}</p>
        </div>
      </Container>
    </footer>
  );
}
