import type { MobileNavItem } from "../types/navigation.types.ts";
import { NavIcon } from "./NavIcon.tsx";

type MobileBottomNavProps = {
  items: MobileNavItem[];
};

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Principal"
      className="fixed bottom-0 z-40 flex h-13 w-full items-center justify-between border-t border-[#322923] bg-[#181411] px-2 lg:hidden"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          aria-label={item.label}
          className={`grid size-11 place-items-center rounded-xl transition-colors ${
            item.active ? "text-massa-gold" : "text-massa-muted hover:text-massa-text"
          }`}
        >
          <NavIcon name={item.icon} className="size-5" />
          <span className="sr-only">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
