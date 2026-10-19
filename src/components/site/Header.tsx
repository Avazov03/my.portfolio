import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GoldButton } from "./GoldButton";
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
        <GoldButton
          href={`/${locale}/contact`}
          variant="outline"
          className="hidden px-4 py-1.5 text-[11px] font-semibold tracking-[0.06em] whitespace-nowrap normal-case sm:inline-flex"
        >
          {dict.nav.cta}
        </GoldButton>
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
