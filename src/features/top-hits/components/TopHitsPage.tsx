import { Spinner } from "@heroui/react";
import { MapPin, Trophy } from "lucide-react";
import { useState } from "react";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { useTopHitsCharts } from "../hooks/use-top-hits.ts";
import type { TopHitsChartTabId } from "../types/top-hits.types.ts";
import { TopHitsChartSection } from "./TopHitsChartSection.tsx";
import { TopHitsMobileBar } from "./TopHitsMobileBar.tsx";
import { TopHitsTabs } from "./TopHitsTabs.tsx";

function formatUpdatedAt(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function TopHitsPage() {
  const [tab, setTab] = useState<TopHitsChartTabId>("songs");
  const charts = useTopHitsCharts("brasil");
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();

  if (currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando ranking…
        </div>
      </div>
    );
  }

  if (!currentUser.data || !sideNav.data || !mobileNav.data) {
    return null;
  }

  const scopeLabel = charts.data?.scope.label ?? "Brasil";

  return (
    <AppShell
      stretchMain
      sideNav={
        <SideNav
          items={sideNav.data.items}
          publish={sideNav.data.publish}
          user={currentUser.data}
        />
      }
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-fm-yellow-light">
          <TopHitsMobileBar scopeLabel={scopeLabel} />

          <div className="hidden shrink-0 border-b border-massa-border px-4 py-4 lg:block">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-fm-blue">
                  Massa Charts
                </p>
                <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-fm-purple">
                  <Trophy className="size-6" aria-hidden />
                  Ranking
                </h1>
                <p className="massa-description mt-1 text-massa-muted">
                  Músicas mais escutadas e clipes mais vistos pelos fãs
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-fm-purple/25 bg-fm-yellow-bright px-3 py-1.5">
                  <MapPin className="size-4 text-fm-blue" aria-hidden />
                  <span className="text-xs font-semibold text-fm-purple">Nível {scopeLabel}</span>
                </div>
                {charts.data ? (
                  <p className="massa-description text-massa-muted">
                    Atualizado {formatUpdatedAt(charts.data.updatedAt)}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {charts.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {charts.isError || !charts.data ? (
            <p className="px-4 py-16 text-center massa-description text-massa-muted">
              Não foi possível carregar o ranking.
            </p>
          ) : null}

          {charts.data ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <TopHitsTabs selected={tab} onChange={setTab} />

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-2 lg:items-start lg:divide-x lg:divide-massa-border">
                <TopHitsChartSection
                  kind="song"
                  title="Músicas"
                  items={charts.data.songs}
                  className={`min-h-0 ${tab === "songs" ? "flex max-lg:flex" : "hidden lg:flex"}`}
                />
                <TopHitsChartSection
                  kind="video"
                  title="Clipes"
                  items={charts.data.videos}
                  className={`min-h-0 ${tab === "videos" ? "flex max-lg:flex" : "hidden lg:flex"}`}
                />
              </div>
            </div>
          ) : null}
        </div>
      }
    />
  );
}
