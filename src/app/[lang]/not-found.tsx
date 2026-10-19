import { GoldButton } from "@/components/site/GoldButton";
import { Header } from "@/components/site/Header";
import { Stage } from "@/components/site/Stage";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = dict.notFound;
  return (
    <main>
      <title>{dict.meta.notFound}</title>
      <Stage className="min-h-[80svh] lg:min-h-[640px]">
        <Header locale={locale} dict={dict} />
        <span
          aria-hidden="true"
          className="stroke-text pointer-events-none absolute right-[4%] bottom-[-0.1em] text-[clamp(160px,30vw,420px)] leading-none font-extrabold tracking-[-0.05em] select-none"
        >
          404
        </span>
        <div className="relative z-20 flex flex-1 flex-col justify-center px-6 py-16 sm:px-10 lg:px-14">
          <h1 className="text-[clamp(44px,7vw,96px)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase">
            <span className="block text-gold">{copy.heading[0]}</span>
            <span className="block text-ink">{copy.heading[1]}</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{copy.text}</p>
          <div className="mt-8">
            <GoldButton href={`/${locale}`}>{copy.home}</GoldButton>
          </div>
        </div>
      </Stage>
    </main>
  );
}
