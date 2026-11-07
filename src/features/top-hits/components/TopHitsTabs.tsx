import type { TopHitsChartTabId } from "../types/top-hits.types.ts";

const TABS: { id: TopHitsChartTabId; label: string }[] = [
  { id: "songs", label: "Músicas" },
  { id: "videos", label: "Clipes" },
];

type TopHitsTabsProps = {
  selected: TopHitsChartTabId;
  onChange: (tab: TopHitsChartTabId) => void;
};

export function TopHitsTabs({ selected, onChange }: TopHitsTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Ranking Top Hits"
      className="flex shrink-0 border-b border-massa-border bg-fm-yellow-light lg:hidden"
    >
      {TABS.map((tab) => {
        const isSelected = tab.id === selected;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`-mb-px flex h-12 min-w-0 flex-1 items-center justify-center border-b-2 text-sm font-semibold transition-colors ${
              isSelected
                ? "border-fm-purple text-fm-purple"
                : "border-transparent text-massa-muted hover:text-fm-purple"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
