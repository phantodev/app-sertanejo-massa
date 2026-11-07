import { Button, Spinner } from "@heroui/react";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useEventFilterOptions, useEventSections } from "../hooks/use-events.ts";
import type { EventFilters } from "../types/events.types.ts";
import { EventCard } from "./EventCard.tsx";
import { EventFiltersSheet } from "./EventFiltersSheet.tsx";
import { EventsMobileBar } from "./EventsMobileBar.tsx";

const EMPTY_FILTERS: EventFilters = { period: null, state: null, city: null };

export function EventsPage() {
  const [filters, setFilters] = useState<EventFilters>(EMPTY_FILTERS);
  const [draft, setDraft] = useState<EventFilters>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const filterOptions = useEventFilterOptions();
  const sections = useEventSections(filters);

  const filterActive = useMemo(
    () => Boolean(filters.period || filters.state || filters.city),
    [filters],
  );

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando eventos…
        </div>
      </div>
    );
  }

  return (
    <>
      <AppShell
        sideNav={
          <SideNav
            items={sideNav.data.items}
            publish={sideNav.data.publish}
            user={currentUser.data}
          />
        }
        rightRail={<SuggestionsPanel suggestions={suggestions.data ?? []} />}
        bottomNav={<MobileBottomNav items={mobileNav.data} />}
        main={
          <>
            <EventsMobileBar
              filterActive={filterActive}
              onOpenFilters={() => {
                setDraft(filters);
                setFiltersOpen(true);
              }}
            />

            <div className="hidden items-center justify-between gap-3 border-b border-massa-border px-4 py-4 lg:flex">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-fm-blue">
                  Agenda Massa
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-fm-purple">Eventos</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-massa-border bg-fm-yellow-light px-4 text-sm font-semibold text-fm-purple"
                  onClick={() => {
                    setDraft(filters);
                    setFiltersOpen(true);
                  }}
                >
                  <SlidersHorizontal className="size-4" />
                  Filtros
                  {filterActive ? <span className="size-1.5 rounded-full bg-massa-gold" /> : null}
                </button>
                <Link
                  to="/events/create"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-fm-blue px-4 text-sm font-semibold text-white"
                >
                  <Plus className="size-4" />
                  Criar
                </Link>
              </div>
            </div>

            <div className="border-b border-massa-border px-4 py-4">
              <p className="massa-description text-massa-muted">
                Shows, rodeios, encontros e noites da comunidade. Filtre por período e cidade e
                marque presença com um toque.
              </p>
            </div>

            {sections.isLoading ? (
              <div className="flex justify-center py-16 text-massa-muted">
                <Spinner color="current" size="sm" />
              </div>
            ) : null}

            {!sections.isLoading && (sections.data?.length ?? 0) === 0 ? (
              <div className="space-y-3 px-6 py-16 text-center">
                <p className="text-lg font-bold text-fm-blue">Nenhum evento por aqui</p>
                <p className="text-xs font-semibold text-massa-muted">
                  Ajuste os filtros ou limpe pra ver a agenda completa da Massa.
                </p>
                {filterActive ? (
                  <Button
                    className="bg-massa-gold font-semibold text-[#1a100b]"
                    onPress={() => setFilters(EMPTY_FILTERS)}
                  >
                    Limpar filtros
                  </Button>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-8 px-4 py-5">
              {sections.data?.map((section) => (
                <section key={section.id} aria-labelledby={`events-${section.id}`}>
                  <div className="mb-3 flex items-end justify-between gap-3">
                    <h2
                      id={`events-${section.id}`}
                      className="text-sm font-bold tracking-tight text-fm-purple"
                    >
                      {section.title}
                    </h2>
                    <span className="text-xs font-semibold text-massa-muted">
                      {section.events.length} {section.events.length === 1 ? "evento" : "eventos"}
                    </span>
                  </div>

                  <ul
                    className={
                      section.id === "featured" ? "space-y-4" : "grid gap-4 sm:grid-cols-2"
                    }
                  >
                    {section.events.map((event) => (
                      <li
                        key={event.id}
                        className={section.id === "featured" ? "sm:col-span-2" : undefined}
                      >
                        <EventCard
                          event={event}
                          featured={section.id === "featured" || event.featured}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        }
      />

      {filterOptions.data ? (
        <EventFiltersSheet
          open={filtersOpen}
          draft={draft}
          options={filterOptions.data}
          onClose={() => setFiltersOpen(false)}
          onChange={setDraft}
          onClear={() => setDraft(EMPTY_FILTERS)}
          onApply={() => {
            setFilters(draft);
            setFiltersOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
