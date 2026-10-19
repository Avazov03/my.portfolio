import type { Metadata } from "next";
import { contact } from "@/content/profile";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/contact/CopyButton";
import { Container } from "@/components/site/Container";
import { PageStage } from "@/components/site/PageStage";
import { Reveal } from "@/components/site/Reveal";
import { SocialIcon } from "@/components/site/icons";
import { alternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.meta.contact,
    description: dict.meta.contactDescription,
    alternates: alternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = dict.contact;

  const channels = [
    { id: "telegram" as const, label: "Telegram", value: contact.telegramHandle, href: contact.telegram, external: true },
    { id: "email" as const, label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
    { id: "github" as const, label: "GitHub", value: contact.githubHandle, href: contact.github, external: true },
  ];

  return (
    <main>
      <PageStage locale={locale} dict={dict} lines={copy.heading} intro={copy.intro} watermark={copy.watermark} />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="sr-only">{copy.channelsLabel}</h2>
            <ul className="flex flex-col gap-4">
              {channels.map((channel, i) => (
                <Reveal as="li" key={channel.id} delay={0.06 * i}>
                  <div className="group flex items-center justify-between gap-4 rounded-[14px] bg-surface px-6 py-6 transition-colors duration-300 hover:bg-surface-2">
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer" : undefined}
                      className="flex min-w-0 items-center gap-4"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-chip text-stage-edge transition-colors duration-200 group-hover:bg-gold">
                        {channel.id === "email" ? (
                          <span className="text-sm font-extrabold">@</span>
                        ) : (
                          <SocialIcon id={channel.id} className="size-5" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted">{channel.label}</span>
                        <span className="block truncate text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-gold">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                    {channel.id === "email" && (
                      <CopyButton value={contact.email} label={copy.copy} doneLabel={copy.copied} />
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
            <div className="rounded-[18px] bg-surface p-6 sm:p-10">
              <h2 className="mb-8 text-[clamp(26px,2.6vw,36px)] leading-tight font-bold text-ink">{copy.form.heading}</h2>
              <ContactForm email={contact.email} copy={copy.form} />
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
