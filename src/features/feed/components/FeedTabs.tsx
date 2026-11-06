import { Tabs } from "@heroui/react";
import type { FeedTab, FeedTabId } from "../types/feed.types.ts";

type FeedTabsProps = {
  tabs: FeedTab[];
  selected: FeedTabId;
  onChange: (tab: FeedTabId) => void;
  /** Compacto para o header mobile — underline colado no divider */
  compact?: boolean;
  className?: string;
};

export function FeedTabs({
  tabs,
  selected,
  onChange,
  compact = false,
  className = "",
}: FeedTabsProps) {
  if (compact) {
    return (
      <div role="tablist" aria-label="Feed" className={`flex h-full w-full min-w-0 ${className}`}>
        {tabs.map((tab) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange(tab.id)}
              className={`-mb-px flex h-full min-w-0 flex-1 items-center justify-center border-b-2 px-1 text-[13px] font-semibold transition-colors ${
                isSelected
                  ? "border-fm-purple text-fm-purple"
                  : "border-transparent text-massa-muted hover:text-fm-purple"
              }`}
            >
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <Tabs
      variant="secondary"
      selectedKey={selected}
      onSelectionChange={(key) => onChange(String(key) as FeedTabId)}
      className={`w-full min-w-0 ${className}`}
    >
      <Tabs.ListContainer className="rounded-none bg-transparent">
        <Tabs.List
          aria-label="Feed"
          className="grid w-full grid-cols-2 border-0 border-b border-massa-border bg-transparent p-0"
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.id}
              id={tab.id}
              className="h-14 justify-center rounded-none text-[15px] font-semibold text-massa-muted data-[selected=true]:text-massa-text"
            >
              {tab.label}
              <Tabs.Indicator className="rounded-none bg-massa-gold" />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
