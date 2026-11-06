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
  | "logout"
  | "publish";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: NavIcon;
  badge?: number;
  active?: boolean;
  /** Ação especial (ex.: logout) em vez de navegação. */
  action?: "logout";
};

export type MobileNavItem = Pick<NavItem, "id" | "label" | "href" | "icon" | "active">;
