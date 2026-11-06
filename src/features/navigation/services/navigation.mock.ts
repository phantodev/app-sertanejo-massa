import type { MobileNavItem, NavItem } from "../types/navigation.types.ts";

export const mockSideNavItems: NavItem[] = [
  { id: "for-you", label: "Para você", href: "/", icon: "home", active: true },
  { id: "shorts", label: "Shorts", href: "/shorts", icon: "shorts" },
  { id: "messages", label: "Mensagens", href: "/messages", icon: "messages" },
  { id: "notifications", label: "Notificações", href: "/notifications", icon: "notifications" },
  { id: "radar", label: "Radar", href: "/radar", icon: "radar" },
  { id: "latest", label: "Últimas", href: "/latest", icon: "latest" },
  { id: "events", label: "Eventos", href: "/events", icon: "events" },
  { id: "ranking", label: "Ranking", href: "/ranking", icon: "ranking" },
  { id: "bookmarks", label: "Salvos", href: "/bookmarks", icon: "bookmarks" },
  { id: "settings", label: "Configurações", href: "/settings", icon: "settings" },
];

export const mockPublishItem: NavItem = {
  id: "publish",
  label: "Publicar",
  href: "/create",
  icon: "publish",
};

export const mockMobileNavItems: MobileNavItem[] = [
  { id: "for-you", label: "Para você", href: "/", icon: "home", active: true },
  { id: "shorts", label: "Shorts", href: "/shorts", icon: "shorts" },
  { id: "messages", label: "Mensagens", href: "/messages", icon: "messages" },
  { id: "notifications", label: "Notificações", href: "/notifications", icon: "notifications" },
  { id: "radar", label: "Radar", href: "/radar", icon: "radar" },
];
