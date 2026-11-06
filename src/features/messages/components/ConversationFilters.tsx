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
                ? "bg-fm-purple text-white"
                : "border border-fm-purple/20 bg-fm-yellow-light text-massa-muted hover:text-fm-purple"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
