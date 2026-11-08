import type { LatestTabId } from "../types/latest.types.ts";

const TABS: { id: LatestTabId; label: string }[] = [
  { id: "photos", label: "Últimas fotos" },
  { id: "videos", label: "Últimos vídeos" },
];

type LatestTabsProps = {
  selected: LatestTabId;
  onChange: (tab: LatestTabId) => void;
};

export function LatestTabs({ selected, onChange }: LatestTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Últimas publicações"
      className="flex shrink-0 border-b border-massa-border bg-fm-yellow-light"
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
            className={`-mb-px flex h-12 min-w-0 flex-1 items-center justify-center border-b-2 px-2 text-sm font-semibold transition-colors ${
              isSelected
                ? "border-fm-blue text-fm-blue"
                : "border-transparent text-massa-muted hover:text-fm-blue"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
