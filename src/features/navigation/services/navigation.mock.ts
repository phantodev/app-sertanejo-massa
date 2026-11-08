import type { MobileNavItem, NavItem } from "../types/navigation.types.ts";

export const mockSideNavItems: NavItem[] = [
  { id: "for-you", label: "Para você", href: "/feed", icon: "home", active: true },
  // Shorts — oculto por enquanto; voltamos com esse item no menu em breve.
  // { id: "shorts", label: "Shorts", href: "/shorts", icon: "shorts" },
  { id: "messages", label: "Mensagens", href: "/messages", icon: "messages" },
  { id: "notifications", label: "Notificações", href: "/notifications", icon: "notifications" },
  { id: "latest", label: "Últimas", href: "/latest", icon: "latest" },
  { id: "events", label: "Eventos", href: "/events", icon: "events" },
  { id: "ranking", label: "Ranking", href: "/ranking", icon: "ranking" },
  { id: "bookmarks", label: "Salvos", href: "/bookmarks", icon: "bookmarks" },
  { id: "settings", label: "Configurações", href: "/settings", icon: "settings" },
  {
    id: "logout",
    label: "Sair do app",
    href: "/",
    icon: "logout",
    action: "logout",
  },
];

export const mockPublishItem: NavItem = {
  id: "publish",
  label: "Publicar",
  href: "/create",
  icon: "publish",
};

export const mockMobileNavItems: MobileNavItem[] = [
  { id: "for-you", label: "Para você", href: "/feed", icon: "home", active: true },
  // Shorts — oculto por enquanto; voltamos com esse item no menu em breve.
  // { id: "shorts", label: "Shorts", href: "/shorts", icon: "shorts" },
  { id: "messages", label: "Mensagens", href: "/messages", icon: "messages" },
  { id: "events", label: "Eventos", href: "/events", icon: "events" },
  { id: "ranking", label: "Ranking", href: "/ranking", icon: "ranking" },
];
