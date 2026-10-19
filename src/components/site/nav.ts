import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type NavItem = { key: string; href: string; label: string; exact?: boolean; anchor?: boolean };

export function getNavItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return [
    { key: "home", href: `/${locale}`, label: nav.home, exact: true },
    { key: "about", href: `/${locale}/about`, label: nav.about },
    { key: "projects", href: `/${locale}/projects`, label: nav.projects },
    { key: "services", href: `/${locale}#services`, label: nav.services, anchor: true },
    { key: "contact", href: `/${locale}/contact`, label: nav.contact },
  ];
}

export function isActive(item: NavItem, pathname: string) {
  if (item.anchor) return false;
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}
