"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ current, label, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted" aria-hidden="true">·</span>}
          <Link
            href={`/${locale}${rest}`}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`px-1 py-1 uppercase transition-colors duration-200 ${
              locale === current ? "text-gold" : "text-ink-soft hover:text-ink"
            }`}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
