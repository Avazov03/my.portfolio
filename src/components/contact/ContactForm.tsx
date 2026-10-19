"use client";

import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { GoldButton } from "@/components/site/GoldButton";

type ContactFormProps = {
  email: string;
  copy: Dictionary["contact"]["form"];
};

const field =
  "w-full rounded-lg bg-surface-2 px-4 py-3.5 text-base text-ink placeholder:text-muted outline-none transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-gold";

export function ContactForm({ email, copy }: ContactFormProps) {
  const id = useId();
  const [type, setType] = useState(copy.types[0]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `${copy.name}: ${data.get("name")}`,
      `${copy.contact}: ${data.get("contact")}`,
      `${copy.type}: ${type}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2" htmlFor={`${id}-name`}>
          <span className="text-sm font-semibold text-ink-soft">{copy.name}</span>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-2" htmlFor={`${id}-contact`}>
          <span className="text-sm font-semibold text-ink-soft">{copy.contact}</span>
          <input id={`${id}-contact`} name="contact" required autoComplete="email" className={field} />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold text-ink-soft">{copy.type}</legend>
        <div className="flex flex-wrap gap-2.5">
          {copy.types.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={type === option}
              onClick={() => setType(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                type === option ? "bg-gold text-black" : "bg-surface-2 text-ink-soft hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2" htmlFor={`${id}-message`}>
        <span className="text-sm font-semibold text-ink-soft">{copy.message}</span>
        <textarea id={`${id}-message`} name="message" required rows={6} className={`${field} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <GoldButton type="submit">{copy.submit}</GoldButton>
        <p className="text-sm text-muted">{copy.note}</p>
      </div>
    </form>
  );
}
