import { NavLink } from "react-router-dom";
import type { MobileNavItem } from "../types/navigation.types.ts";
import { NavIcon } from "./NavIcon.tsx";

type MobileBottomNavProps = {
  items: MobileNavItem[];
};

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Principal"
      className="fixed bottom-0 z-40 flex h-13 w-full items-center justify-between border-t border-fm-purple/20 bg-fm-yellow-light px-2 lg:hidden"
    >
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.href}
          end={item.href === "/feed"}
          aria-label={item.label}
          className={({ isActive }) =>
            `grid size-11 place-items-center rounded-xl transition-colors ${
              isActive ? "text-fm-purple" : "text-massa-muted hover:text-fm-purple"
            }`
          }
        >
          <NavIcon name={item.icon} className="size-5" />
          <span className="sr-only">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
