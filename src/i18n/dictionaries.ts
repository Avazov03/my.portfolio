import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import type uz from "./dictionaries/uz.json";
import { hasLocale, type Locale } from "./config";

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uz: () => import("./dictionaries/uz.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
