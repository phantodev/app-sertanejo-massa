export type NavIcon =
  | "home"
  | "shorts"
  | "messages"
  | "notifications"
  | "radar"
  | "latest"
  | "events"
  | "ranking"
  | "bookmarks"
  | "settings"
  | "publish";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: NavIcon;
  badge?: number;
  active?: boolean;
};

export type MobileNavItem = Pick<NavItem, "id" | "label" | "href" | "icon" | "active">;
