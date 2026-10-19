"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, type NavItem } from "./nav";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-9 text-sm font-medium">
      {items.map((item) => {
        const active = isActive(item, pathname);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative py-1 transition-colors duration-200 ${
                active ? "text-gold" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
              {active && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gold" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
