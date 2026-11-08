import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FeedList } from "../../feed/components/FeedList.tsx";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { ProfileMediaGrid } from "../../profile/components/ProfileMediaGrid.tsx";
import { ProfileMobileBar } from "../../profile/components/ProfileMobileBar.tsx";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useFanPage } from "../hooks/use-fan-page.ts";
import type { FanPageTab, FanPageTabId } from "../types/fan-page.types.ts";
import { FanPageAbout } from "./FanPageAbout.tsx";
import { FanPageEventsTab } from "./FanPageEventsTab.tsx";
import { FanPageHeader } from "./FanPageHeader.tsx";
import { FanPageTabs } from "./FanPageTabs.tsx";

const FAN_PAGE_TABS: FanPageTab[] = [
  { id: "posts", label: "Publicações" },
  { id: "media", label: "Fotos e vídeos" },
  { id: "events", label: "Agenda" },
  { id: "about", label: "Sobre" },
];

type FanPagePageProps = {
  handle: string;
};

export function FanPagePage({ handle }: FanPagePageProps) {
  const [tab, setTab] = useState<FanPageTabId>("posts");

  useEffect(() => {
    setTab("posts");
  }, [handle]);

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const fanPage = useFanPage(handle);

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando Fan Page…
        </div>
      </div>
    );
  }

  const page = fanPage.data;

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
        <>
          {fanPage.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {fanPage.isError || (!fanPage.isLoading && !page) ? (
            <div className="space-y-4 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-massa-text">Fan Page não encontrada</p>
              <p className="text-xs font-semibold text-massa-muted">
                Não achamos @{handle}. Confira o link e tente de novo.
              </p>
              <Link
                to="/feed"
                className="inline-flex h-10 items-center justify-center rounded-full bg-massa-gold px-5 text-sm font-semibold text-[#1a100b]"
              >
                Voltar ao feed
              </Link>
            </div>
          ) : null}

          {page ? (
            <>
              <ProfileMobileBar displayName={page.displayName} />

              <div className="hidden items-center gap-3 border-b border-massa-border px-4 py-3 lg:flex">
                <Link
                  to="/feed"
                  className="text-sm font-bold text-fm-blue transition-colors hover:text-fm-blue/80"
                >
                  ← Feed
                </Link>
                <span className="font-bold text-massa-muted">/</span>
                <span className="truncate text-sm font-bold text-massa-text">Fan Page</span>
                <span className="font-bold text-massa-muted">/</span>
                <span className="truncate text-sm font-bold text-massa-text">
                  {page.displayName}
                </span>
              </div>

              <FanPageHeader page={page} />

              <div className="sticky top-0 z-20 border-b border-massa-border bg-massa-bg/95 backdrop-blur-md">
                <FanPageTabs tabs={FAN_PAGE_TABS} selected={tab} onChange={setTab} />
              </div>

              {tab === "posts" ? (
                page.posts.length > 0 ? (
                  <FeedList posts={page.posts} />
                ) : (
                  <p className="px-4 py-16 text-center text-xs font-semibold text-massa-muted">
                    Nenhuma publicação ainda.
                  </p>
                )
              ) : null}

              {tab === "media" ? <ProfileMediaGrid items={page.media} /> : null}

              {tab === "events" ? <FanPageEventsTab events={page.events} /> : null}

              {tab === "about" ? <FanPageAbout page={page} /> : null}
            </>
          ) : null}
        </>
      }
    />
  );
}
