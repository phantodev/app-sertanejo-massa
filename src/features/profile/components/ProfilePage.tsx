import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FeedList } from "../../feed/components/FeedList.tsx";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useProfile } from "../hooks/use-profile.ts";
import { isReservedHandle } from "../lib/reserved-handles.ts";
import type { ProfileTab, ProfileTabId } from "../types/profile.types.ts";
import { ProfileAbout } from "./ProfileAbout.tsx";
import { ProfileHeader } from "./ProfileHeader.tsx";
import { ProfileMediaGrid } from "./ProfileMediaGrid.tsx";
import { ProfileMobileBar } from "./ProfileMobileBar.tsx";
import { ProfileTabs } from "./ProfileTabs.tsx";

const PROFILE_TABS: ProfileTab[] = [
  { id: "posts", label: "Publicações" },
  { id: "media", label: "Fotos e vídeos" },
  { id: "about", label: "Sobre" },
];

export function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  const [tab, setTab] = useState<ProfileTabId>("posts");
  const reserved = isReservedHandle(handle);

  useEffect(() => {
    setTab("posts");
  }, [handle]);

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const profile = useProfile(reserved ? undefined : handle);

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando perfil…
        </div>
      </div>
    );
  }

  const midSuggestions = suggestions.data ?? [];

  return (
    <AppShell
      sideNav={
        <SideNav
          items={sideNav.data.items}
          publish={sideNav.data.publish}
          user={currentUser.data}
        />
      }
      rightRail={<SuggestionsPanel suggestions={midSuggestions} />}
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <>
          {reserved ? (
            <div className="space-y-4 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-massa-text">Em breve na Massa</p>
              <p className="text-xs font-semibold text-massa-muted">
                Essa área ainda está sendo afinada. Volte logo pra curtir o lançamento.
              </p>
              <Link
                to="/feed"
                className="inline-flex h-10 items-center justify-center rounded-full bg-massa-gold px-5 text-sm font-semibold text-[#1a100b]"
              >
                Voltar ao feed
              </Link>
            </div>
          ) : null}

          {!reserved && profile.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {!reserved && (profile.isError || (!profile.isLoading && !profile.data)) ? (
            <div className="space-y-4 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-massa-text">Perfil não encontrado</p>
              <p className="text-xs font-semibold text-massa-muted">
                Não achamos @{handle} na Massa. Confira o nome e tente de novo.
              </p>
              <Link
                to="/feed"
                className="inline-flex h-10 items-center justify-center rounded-full bg-massa-gold px-5 text-sm font-semibold text-[#1a100b]"
              >
                Voltar ao feed
              </Link>
            </div>
          ) : null}

          {profile.data ? (
            <>
              <ProfileMobileBar displayName={profile.data.user.displayName} />

              <div className="hidden items-center gap-3 border-b border-massa-border px-4 py-3 lg:flex">
                <Link
                  to="/feed"
                  className="text-sm font-bold text-fm-blue transition-colors hover:text-fm-blue/80"
                >
                  ← Feed
                </Link>
                <span className="font-bold text-massa-muted">/</span>
                <span className="truncate text-sm font-bold text-massa-text">
                  {profile.data.user.displayName}
                </span>
              </div>

              <ProfileHeader profile={profile.data} />

              <div className="sticky top-0 z-20 border-b border-massa-border bg-massa-bg/95 backdrop-blur-md lg:top-0">
                <ProfileTabs tabs={PROFILE_TABS} selected={tab} onChange={setTab} />
              </div>

              {tab === "posts" ? (
                profile.data.posts.length > 0 ? (
                  <FeedList posts={profile.data.posts} />
                ) : (
                  <div className="px-4 py-16 text-center text-xs font-semibold text-massa-muted">
                    Nenhuma publicação ainda.
                  </div>
                )
              ) : null}

              {tab === "media" ? <ProfileMediaGrid items={profile.data.media} /> : null}

              {tab === "about" ? <ProfileAbout profile={profile.data} /> : null}
            </>
          ) : null}
        </>
      }
    />
  );
}
