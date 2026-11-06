import { Button } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";
import { useAuth } from "../../auth/hooks/use-auth.ts";
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
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.logout();
    navigate("/", { replace: true });
  }

  return (
    <nav
      aria-label="Principal"
      className="hidden h-dvh w-[275px] min-w-[275px] max-w-[275px] shrink-0 flex-col border-r border-fm-purple/20 bg-massa-bg px-3.5 py-4 lg:flex"
    >
      <div className="mb-7 px-1">
        <BrandLogo variant="transparent" />
      </div>

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>
            {item.action === "logout" ? (
              <button
                type="button"
                onClick={() => {
                  void handleLogout();
                }}
                className="flex min-h-10 w-full items-center gap-3 rounded-full px-3.5 py-2 text-[15px] font-bold text-fm-purple transition-colors hover:bg-fm-yellow-light/60 hover:text-fm-purple-dark"
              >
                <NavIcon name={item.icon} className="size-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.href}
                end={item.href === "/feed"}
                className={({ isActive }) =>
                  `flex min-h-10 w-full items-center gap-3 rounded-full px-3.5 py-2 text-[15px] font-bold transition-colors ${
                    isActive
                      ? "bg-fm-purple text-white"
                      : "text-fm-purple hover:bg-fm-yellow-light/60 hover:text-fm-purple-dark"
                  }`
                }
              >
                <NavIcon name={item.icon} className="size-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <Button
          className="btn-fm-blue w-full justify-center rounded-full bg-fm-blue text-white"
          fullWidth
        >
          <NavIcon name="publish" className="size-4" />
          {publish.label}
        </Button>
        <AccountMenu user={user} />
      </div>
    </nav>
  );
}
