import {
  Bookmark,
  CalendarDays,
  Clapperboard,
  Flame,
  Home,
  MessageCircle,
  Bell,
  Plus,
  LogOut,
  Music2,
  Settings,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { NavIcon as NavIconName } from "../types/navigation.types.ts";

const ICONS: Record<NavIconName, LucideIcon> = {
  home: Home,
  shorts: Clapperboard,
  messages: MessageCircle,
  notifications: Bell,
  music: Music2,
  latest: Flame,
  events: CalendarDays,
  ranking: Trophy,
  bookmarks: Bookmark,
  settings: Settings,
  logout: LogOut,
  publish: Plus,
};

type NavIconProps = {
  name: NavIconName;
  className?: string;
};

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
