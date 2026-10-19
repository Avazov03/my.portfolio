import { Hero } from "@/components/home/Hero";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <main>
      <Hero locale={locale} dict={dict} />
    </main>
  );
}
