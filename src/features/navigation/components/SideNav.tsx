import { Button } from "@heroui/react";
import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";
import type { CurrentUser } from "../../session/types/session.types.ts";
import type { NavItem } from "../types/navigation.types.ts";
import { AccountMenu } from "./AccountMenu.tsx";
import { NavIcon } from "./NavIcon.tsx";

type SideNavProps = {
  items: NavItem[];
  publish: NavItem;
  user: CurrentUser;
};

export function SideNav({ items, publish, user }: SideNavProps) {
  return (
    <nav
      aria-label="Principal"
      className="hidden h-dvh w-[275px] shrink-0 flex-col border-r border-massa-border/70 bg-massa-bg px-3.5 py-4 lg:flex"
    >
      <div className="mb-7 px-2">
        <BrandLogo />
      </div>

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex min-h-12 w-fit max-w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-[15px] font-bold transition-colors ${
                item.active
                  ? "bg-massa-gold/15 text-massa-gold"
                  : "text-[#dfd5cc] hover:bg-white/5 hover:text-massa-gold"
              }`}
            >
              <NavIcon name={item.icon} className="size-5 shrink-0" />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <Button className="w-full justify-center bg-massa-gold text-[#1a100b]" fullWidth>
          <NavIcon name="publish" className="size-4" />
          {publish.label}
        </Button>
        <AccountMenu user={user} />
      </div>
    </nav>
  );
}
