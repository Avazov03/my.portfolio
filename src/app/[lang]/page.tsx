import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { StackSection } from "@/components/home/StackSection";
import { ContactCta } from "@/components/site/ContactCta";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <main>
      <Hero locale={locale} dict={dict} />
      <Intro locale={locale} dict={dict} />
      <SelectedWork locale={locale} dict={dict} />
      <StackSection dict={dict} />
      <Services locale={locale} dict={dict} />
      <Process dict={dict} />
      <ContactCta dict={dict} />
    </main>
  );
}
