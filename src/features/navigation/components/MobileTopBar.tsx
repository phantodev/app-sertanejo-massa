import { Bell, Plus } from "lucide-react";
import { FeedTabs } from "../../feed/components/FeedTabs.tsx";
import type { FeedTab, FeedTabId } from "../../feed/types/feed.types.ts";

type MobileTopBarProps = {
  tabs: FeedTab[];
  selectedTab: FeedTabId;
  onTabChange: (tab: FeedTabId) => void;
  notificationCount?: number;
};

export function MobileTopBar({
  tabs,
  selectedTab,
  onTabChange,
  notificationCount = 0,
}: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-stretch border-b border-massa-border bg-massa-bg/95 px-1 backdrop-blur-md lg:hidden">
      <a
        href="/create"
        aria-label="Publicar"
        className="grid w-11 shrink-0 place-items-center self-center text-fm-purple transition-colors hover:text-fm-purple-dark"
      >
        <Plus className="size-6" strokeWidth={2} />
      </a>

      <div className="min-w-0 flex-1">
        <FeedTabs compact tabs={tabs} selected={selectedTab} onChange={onTabChange} />
      </div>

      <a
        href="/notifications"
        aria-label={
          notificationCount > 0 ? `Notificações, ${notificationCount} novas` : "Notificações"
        }
        className="relative grid w-11 shrink-0 place-items-center self-center text-fm-purple transition-colors hover:text-fm-purple-dark"
      >
        <Bell className="size-5" strokeWidth={1.75} />
        {notificationCount > 0 ? (
          <span className="absolute right-2 top-2.5 size-2 rounded-full bg-[#e70044] ring-2 ring-massa-bg" />
        ) : null}
      </a>
    </header>
  );
}
