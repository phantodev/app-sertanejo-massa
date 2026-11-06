import type { ProfileTab, ProfileTabId } from "../types/profile.types.ts";

type ProfileTabsProps = {
  tabs: ProfileTab[];
  selected: ProfileTabId;
  onChange: (tab: ProfileTabId) => void;
};

export function ProfileTabs({ tabs, selected, onChange }: ProfileTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Seções do perfil"
      className="flex w-full border-b border-massa-border"
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
            className={`-mb-px flex h-12 min-w-0 flex-1 items-center justify-center border-b-2 px-2 text-[13px] font-semibold transition-colors sm:text-[15px] ${
              isSelected
                ? "border-massa-gold text-massa-text"
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
