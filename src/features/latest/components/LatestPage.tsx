import { Spinner } from "@heroui/react";
import { Flame, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useLatestFeed } from "../hooks/use-latest.ts";
import type { LatestTabId } from "../types/latest.types.ts";
import { LatestMediaGrid } from "./LatestMediaGrid.tsx";
import { LatestMobileBar } from "./LatestMobileBar.tsx";
import { LatestTabs } from "./LatestTabs.tsx";

export function LatestPage() {
  const [tab, setTab] = useState<LatestTabId>("photos");

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const latest = useLatestFeed();

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;

  const items = useMemo(() => {
    if (!latest.data) return [];
    return tab === "photos" ? latest.data.photos : latest.data.videos;
  }, [latest.data, tab]);

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando últimas…
        </div>
      </div>
    );
  }

  return (
    <AppShell
      sideNav={
        <SideNav
          items={sideNav.data.items}
          publish={sideNav.data.publish}
          user={currentUser.data}
        />
      }
      rightRail={<SuggestionsPanel suggestions={suggestions.data ?? []} />}
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <div className="min-h-0 bg-fm-yellow-light pb-16 lg:pb-4">
          <LatestMobileBar />

          <div className="hidden items-center justify-between gap-3 border-b border-massa-border px-4 py-4 lg:flex">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-fm-blue">
                Descobrir
              </p>
              <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-fm-purple">
                <Flame className="size-6" aria-hidden />
                Últimas
              </h1>
              <p className="massa-description mt-1 text-massa-muted">
                Fotos e vídeos recentes da comunidade — curta o que tá massa
              </p>
            </div>
            <button
              type="button"
              disabled
              title="Filtros em breve"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-massa-border px-4 py-2 text-sm font-semibold text-massa-muted"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filtrar
            </button>
          </div>

          <LatestTabs selected={tab} onChange={setTab} />

          {latest.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {latest.isError || !latest.data ? (
            <p className="px-4 py-16 text-center massa-description text-massa-muted">
              Não foi possível carregar as últimas publicações.
            </p>
          ) : null}

          {latest.data ? <LatestMediaGrid items={items} /> : null}
        </div>
      }
    />
  );
}
