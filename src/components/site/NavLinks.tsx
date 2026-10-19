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
              data-cursor-grow
              className={`group relative py-1 transition-colors duration-300 ease-stage ${
                active ? "text-gold" : "text-ink-soft hover:text-gold"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gold transition-[width] duration-300 ease-stage ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
