import { Spinner } from "@heroui/react";
import { useState } from "react";
import { PostComposer } from "../../composer/components/PostComposer.tsx";
import { useComposerActions } from "../../composer/hooks/use-composer-actions.ts";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { MobileTopBar } from "../../navigation/components/MobileTopBar.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { StoriesRail } from "../../stories/components/StoriesRail.tsx";
import { useStories } from "../../stories/hooks/use-stories.ts";
import { SuggestionsCarousel } from "../../suggestions/components/SuggestionsCarousel.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useFeedPosts } from "../hooks/use-feed-posts.ts";
import { useFeedTabs } from "../hooks/use-feed-tabs.ts";
import { useSurveyBanner } from "../hooks/use-survey-banner.ts";
import type { FeedTabId } from "../types/feed.types.ts";
import { FeedList } from "./FeedList.tsx";
import { FeedTabs } from "./FeedTabs.tsx";
import { SurveyBanner } from "./SurveyBanner.tsx";

export function FeedPage() {
  const [tab, setTab] = useState<FeedTabId>("for-you");

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const stories = useStories();
  const feedTabs = useFeedTabs();
  const feedPosts = useFeedPosts(tab);
  const survey = useSurveyBanner();
  const suggestions = useSuggestions();
  const composerActions = useComposerActions();

  const booting =
    currentUser.isLoading ||
    sideNav.isLoading ||
    mobileNav.isLoading ||
    stories.isLoading ||
    feedTabs.isLoading ||
    composerActions.isLoading;

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando feed…
        </div>
      </div>
    );
  }

  const midSuggestions = suggestions.data ?? [];
  const posts = feedPosts.data ?? [];

  return (
    <AppShell
      topBar={
        feedTabs.data ? (
          <MobileTopBar
            tabs={feedTabs.data}
            selectedTab={tab}
            onTabChange={setTab}
            notificationCount={3}
          />
        ) : undefined
      }
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
          {feedTabs.data ? (
            <div className="sticky top-0 z-20 hidden border-b border-massa-border bg-massa-bg/95 backdrop-blur-md lg:block">
              <FeedTabs tabs={feedTabs.data} selected={tab} onChange={setTab} />
            </div>
          ) : null}

          {stories.data ? <StoriesRail stories={stories.data} /> : null}

          {composerActions.data ? (
            <PostComposer user={currentUser.data} actions={composerActions.data} />
          ) : null}

          {survey.data ? <SurveyBanner survey={survey.data} /> : null}

          {feedPosts.isLoading ? (
            <div className="flex justify-center py-10 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : (
            <>
              <FeedList posts={posts.slice(0, 2)} />
              {midSuggestions.length > 0 ? (
                <div className="xl:hidden">
                  <SuggestionsCarousel suggestions={midSuggestions} />
                </div>
              ) : null}
              <FeedList posts={posts.slice(2)} />
            </>
          )}
        </>
      }
    />
  );
}
