import type { ConversationFilter, ConversationFilterId } from "../types/messages.types.ts";

type ConversationFiltersProps = {
  filters: ConversationFilter[];
  selected: ConversationFilterId;
  onChange: (id: ConversationFilterId) => void;
};

export function ConversationFilters({ filters, selected, onChange }: ConversationFiltersProps) {
  return (
    <div
      role="toolbar"
      aria-label="Filtros de conversas"
      className="flex gap-2 overflow-x-auto px-3 pb-3 scrollbar-none"
    >
      {filters.map((filter) => {
        const active = filter.id === selected;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              active
                ? "bg-massa-gold text-[#1a100b]"
                : "border border-massa-border bg-[#181411] text-massa-muted hover:text-massa-text"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
