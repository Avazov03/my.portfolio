import { heroPhoto } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/site/Header";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Stage } from "@/components/site/Stage";
import { HeroSlider } from "./HeroSlider";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  return (
    <Stage className="min-h-svh lg:h-[clamp(720px,calc(100svh-48px),880px)] lg:min-h-0">
      <Header locale={locale} dict={dict} />
      <HeroSlider
        copy={dict.hero}
        photo={heroPhoto}
        ctaHref={`/${locale}/projects`}
        socials={<SocialLinks />}
      />
    </Stage>
  );
}
