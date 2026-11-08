import {
  Ban,
  Bell,
  Bookmark,
  Bug,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChevronRight,
  Clapperboard,
  Flame,
  LifeBuoy,
  Lightbulb,
  LogOut,
  MapPin,
  Plus,
  Search,
  Settings,
  Trophy,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Spinner } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/use-auth.ts";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Atividade",
    items: [
      { label: "Criar publicação", href: "/feed", icon: Plus },
      { label: "Salvos", href: "/menu/salvos", icon: Bookmark },
      { label: "Notificações", href: "/notifications", icon: Bell },
      { label: "Pesquisar", href: "/menu/pesquisar", icon: Search },
    ],
  },
  {
    title: "Descobrir",
    items: [
      { label: "Últimas", href: "/latest", icon: Flame },
      { label: "Ranking", href: "/ranking", icon: Trophy },
      { label: "Shorts", href: "/menu/shorts", icon: Clapperboard },
      { label: "Sugestões de amizade", href: "/feed", icon: UserPlus },
    ],
  },
  {
    title: "Eventos e locais",
    items: [
      { label: "Explorar eventos", href: "/events", icon: CalendarDays },
      { label: "Meus eventos", href: "/events/my", icon: CalendarCheck },
      { label: "Criar evento", href: "/events/create", icon: CalendarPlus },
      { label: "Check-in", href: "/menu/check-in", icon: MapPin },
    ],
  },
  {
    title: "Mensagens e grupos",
    items: [
      { label: "Explorar grupos", href: "/messages/explore", icon: Users },
      { label: "Criar grupo", href: "/menu/criar-grupo", icon: Plus },
    ],
  },
  {
    title: "Conta e privacidade",
    items: [
      { label: "Configurações", href: "/menu/configuracoes", icon: Settings },
      { label: "Contas bloqueadas", href: "/menu/contas-bloqueadas", icon: Ban },
    ],
  },
  {
    title: "Suporte",
    items: [
      { label: "Falar com o suporte", href: "/menu/suporte", icon: LifeBuoy },
      { label: "Reportar um problema", href: "/menu/reportar-problema", icon: Bug },
      { label: "Enviar uma sugestão", href: "/menu/enviar-sugestao", icon: Lightbulb },
    ],
  },
];

function MenuSectionCard({ title, items }: MenuSection) {
  return (
    <section aria-label={title} className="space-y-2">
      <h2 className="px-1 text-xs font-bold text-massa-muted">{title}</h2>
      <div className="overflow-hidden rounded-2xl border border-massa-border bg-fm-yellow-light">
        {items.map(({ href, icon: Icon, label }, index) => (
          <Link
            key={label}
            to={href}
            className={`flex min-h-12 items-center gap-3 px-4 py-3 text-sm font-semibold text-massa-text transition-colors hover:bg-fm-yellow-bright/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fm-purple ${
              index > 0 ? "border-t border-massa-border/60" : ""
            }`}
          >
            <Icon aria-hidden="true" className="size-5 shrink-0 text-fm-blue" strokeWidth={1.9} />
            <span className="min-w-0 flex-1">{label}</span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-fm-blue" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MenuPage() {
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await auth.logout();
    navigate("/", { replace: true });
  }

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;
  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Spinner color="current" size="sm" />
          Carregando menu…
        </div>
      </div>
    );
  }

  const user = currentUser.data;

  return (
    <AppShell
      sideNav={<SideNav items={sideNav.data.items} publish={sideNav.data.publish} user={user} />}
      rightRail={<SuggestionsPanel suggestions={suggestions.data ?? []} />}
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <>
          <header className="sticky top-0 z-30 border-b border-massa-border bg-fm-yellow-light/95 px-5 py-3 backdrop-blur-md">
            <h1 className="text-lg font-bold tracking-tight text-fm-purple">Menu</h1>
          </header>

          <div className="mx-auto flex w-full max-w-xl flex-col gap-7 px-4 pb-8 pt-4">
            <Link
              to={`/${user.handle}`}
              className="flex min-h-[82px] items-center gap-3 rounded-2xl border border-massa-border bg-fm-yellow-bright px-3 py-3 transition-colors hover:bg-fm-yellow"
            >
              <img
                src={user.avatarUrl}
                alt=""
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-fm-purple/20"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-fm-purple">
                  {user.displayName}
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-massa-muted">
                  Ver meu perfil
                </span>
              </span>
              <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-fm-blue" />
            </Link>

            {MENU_SECTIONS.map((section) => (
              <MenuSectionCard key={section.title} {...section} />
            ))}

            <section aria-label="Sessão" className="space-y-2">
              <h2 className="px-1 text-xs font-bold text-massa-muted">Sessão</h2>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-massa-border bg-fm-yellow-light px-4 py-3 text-left text-sm font-bold text-red-700 transition-colors hover:bg-red-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 disabled:cursor-wait disabled:opacity-70"
              >
                <LogOut aria-hidden="true" className="size-5 shrink-0 text-fm-blue" />
                <span>{isLoggingOut ? "Saindo…" : `Sair de @${user.handle}`}</span>
              </button>
            </section>
          </div>
        </>
      }
    />
  );
}
