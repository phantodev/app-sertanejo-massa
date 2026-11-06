import { Button } from "@heroui/react";
import { X } from "lucide-react";
import type { EventFilterOptions, EventFilters, EventPeriod } from "../types/events.types.ts";

type EventFiltersSheetProps = {
  open: boolean;
  draft: EventFilters;
  options: EventFilterOptions;
  onClose: () => void;
  onChange: (next: EventFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

export function EventFiltersSheet({
  open,
  draft,
  options,
  onClose,
  onChange,
  onApply,
  onClear,
}: EventFiltersSheetProps) {
  if (!open) return null;

  const cities = draft.state ? (options.citiesByState[draft.state] ?? []) : [];
  const hasActive = Boolean(draft.period || draft.state || draft.city);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar filtros"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-filters-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl border border-massa-border bg-[#14110f] shadow-2xl sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-massa-border px-5 py-4">
          <div>
            <h2 id="event-filters-title" className="text-lg font-bold text-massa-text">
              Filtros
            </h2>
            <p className="mt-0.5 text-sm text-massa-muted">Filtrar por período e cidade.</p>
          </div>
          <button
            type="button"
            aria-label="Fechar filtros"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-massa-muted hover:bg-white/5 hover:text-massa-text"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="space-y-6 px-5 py-5">
          <section>
            <p className="mb-2.5 text-sm font-semibold text-massa-text">Período</p>
            <div className="flex flex-wrap gap-2">
              {options.periods.map((period) => {
                const selected = draft.period === period.id;
                return (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...draft,
                        period: selected ? null : (period.id as EventPeriod),
                      })
                    }
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      selected
                        ? "bg-massa-gold text-[#1a100b]"
                        : "border border-massa-border bg-[#1b1714] text-massa-muted hover:text-massa-text"
                    }`}
                  >
                    {period.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-semibold text-massa-text">Estado</span>
              <select
                value={draft.state ?? ""}
                onChange={(event) =>
                  onChange({
                    ...draft,
                    state: event.target.value || null,
                    city: null,
                  })
                }
                className="h-11 w-full rounded-xl border border-massa-border bg-[#1b1714] px-3 text-sm text-massa-text outline-none focus:border-massa-gold/50"
              >
                <option value="">Todos os estados</option>
                {options.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5">
              <span className="text-sm font-semibold text-massa-text">Cidade</span>
              <select
                value={draft.city ?? ""}
                disabled={!draft.state}
                onChange={(event) =>
                  onChange({
                    ...draft,
                    city: event.target.value || null,
                  })
                }
                className="h-11 w-full rounded-xl border border-massa-border bg-[#1b1714] px-3 text-sm text-massa-text outline-none enabled:focus:border-massa-gold/50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <option value="">
                  {draft.state ? "Todas as cidades" : "Selecione o estado primeiro"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </section>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-massa-border px-5 py-4">
          <Button
            variant="ghost"
            isDisabled={!hasActive}
            onPress={onClear}
            className="text-massa-muted"
          >
            Limpar
          </Button>
          <Button className="min-w-28 bg-massa-gold font-semibold text-[#1a100b]" onPress={onApply}>
            Filtrar
          </Button>
        </footer>
      </div>
    </div>
  );
}
