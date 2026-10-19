import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { getNavItems } from "./nav";
import { SocialLinks } from "./SocialLinks";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const items = getNavItems(locale, dict.nav);
  return (
    <header className="relative z-30 flex items-center justify-between gap-6 px-6 pt-7 sm:px-10 lg:px-14 lg:pt-8">
      <Logo
        locale={locale}
        wordmark={dict.brand.wordmark}
        tagline={dict.brand.tagline}
        label={dict.brand.homeLabel}
      />

      <nav aria-label={dict.nav.main} className="hidden lg:block">
        <NavLinks items={items} />
      </nav>

      <div className="flex items-center gap-5 lg:gap-6">
        <LanguageSwitcher current={locale} label={dict.nav.language} className="hidden sm:flex" />
        <Link
          href={`/${locale}/contact`}
          className="hidden rounded-lg border-[1.5px] border-ink px-4 py-1.5 text-xs font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:bg-ink hover:text-black sm:inline-block"
        >
          {dict.nav.cta}
        </Link>
        <MobileMenu
          items={items}
          openLabel={dict.nav.menuOpen}
          closeLabel={dict.nav.menuClose}
          watermark={dict.hero.watermark}
          footer={
            <>
              <LanguageSwitcher current={locale} label={dict.nav.language} className="text-sm" />
              <SocialLinks />
            </>
          }
        />
      </div>
    </header>
  );
}
