import type { FanPageTab, FanPageTabId } from "../types/fan-page.types.ts";

type FanPageTabsProps = {
  tabs: FanPageTab[];
  selected: FanPageTabId;
  onChange: (tab: FanPageTabId) => void;
};

export function FanPageTabs({ tabs, selected, onChange }: FanPageTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Seções da Fan Page"
      className="flex w-full overflow-x-auto border-b border-massa-border scrollbar-none"
    >
      {tabs.map((tab) => {
        const isSelected = tab.id === selected;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`-mb-px flex h-12 min-w-[88px] flex-1 items-center justify-center border-b-2 px-2 text-[12px] font-semibold transition-colors sm:min-w-0 sm:text-[14px] ${
              isSelected
                ? "border-fm-blue text-fm-blue"
                : "border-transparent text-massa-muted hover:text-massa-text"
            }`}
          >
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
