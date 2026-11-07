import { Spinner } from "@heroui/react";
import { Building2, CalendarDays, Ellipsis, MapPin, Share2, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useEvent } from "../hooks/use-event.ts";
import { formatEventBadge, formatEventDetailWhen } from "../lib/format-event-date.ts";
import { EventGoingRow } from "./EventGoingRow.tsx";
import { EventRsvpButton } from "./EventRsvpButton.tsx";
import { EventsMobileBar } from "./EventsMobileBar.tsx";

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const eventQuery = useEvent(eventId);

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;

  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando evento…
        </div>
      </div>
    );
  }

  const event = eventQuery.data;
  const badge = event ? formatEventBadge(event.startsAt) : null;

  return (
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
          <EventsMobileBar title={event?.title ?? "Evento"} />

          {eventQuery.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {eventQuery.isError || (!eventQuery.isLoading && !event) ? (
            <div className="space-y-4 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-massa-text">Evento não encontrado</p>
              <p className="text-sm text-massa-muted">
                Esse rolê pode ter saído da agenda. Volte pra lista e escolha outro.
              </p>
              <Link
                to="/events"
                className="inline-flex h-10 items-center justify-center rounded-full bg-massa-gold px-5 text-sm font-semibold text-[#1a100b]"
              >
                Ver eventos
              </Link>
            </div>
          ) : null}

          {event && badge ? (
            <div className="pb-24">
              <div className="hidden items-center justify-between gap-3 border-b border-massa-border px-4 py-3 lg:flex">
                <Link
                  to="/events"
                  className="text-sm font-bold text-fm-blue transition-colors hover:text-fm-blue-dark"
                >
                  ← Eventos
                </Link>
                <button
                  type="button"
                  aria-label="Opções do evento"
                  className="grid size-9 place-items-center rounded-full text-fm-blue transition-colors hover:bg-fm-blue/10"
                >
                  <Ellipsis className="size-4" />
                </button>
              </div>

              <div className="relative aspect-square overflow-hidden sm:aspect-[16/10]">
                <img
                  src={event.coverUrl}
                  alt={event.title}
                  className="size-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-[#0e0c0b]/25 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(233,179,111,0.18),_transparent_55%)]" />
              </div>

              <div className="relative z-10 space-y-5 px-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-fm-blue text-center shadow-md">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                      {badge.month}
                    </span>
                    <span className="-mt-0.5 text-2xl font-black leading-none text-white">
                      {badge.day}
                    </span>
                  </div>
                  <div className="min-w-0 pt-1">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-massa-text">
                      {event.title}
                    </h1>
                    {event.featured ? (
                      <span className="mt-2 inline-flex rounded-full bg-fm-teal-dark px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                        Em destaque
                      </span>
                    ) : null}
                  </div>
                </div>

                <Link
                  to={`/${event.organizer.handle}`}
                  className="flex items-center gap-3 rounded-2xl border border-massa-border bg-fm-yellow-light p-3 transition-colors hover:border-fm-purple/35"
                >
                  <img
                    src={event.organizer.avatarUrl}
                    alt=""
                    className="size-12 rounded-full object-cover ring-2 ring-fm-purple/20"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-fm-blue">
                      {event.organizer.kind === "venue" ? "Organizado no" : "Organizado por"}
                    </p>
                    <p className="flex items-center gap-1.5 truncate font-bold text-fm-purple">
                      {event.organizer.displayName}
                      {event.organizer.verified ? <VerifiedBadge size="md" /> : null}
                    </p>
                    <p className="truncate text-xs font-semibold text-fm-blue">
                      {event.organizer.kind === "venue" ? "Conta de empresa" : "Perfil Massa"} ·{" "}
                      {event.organizer.city}, {event.organizer.state}
                    </p>
                  </div>
                  {event.organizer.kind === "venue" ? (
                    <Building2 className="size-4 shrink-0 text-fm-blue" />
                  ) : null}
                </Link>

                <ul className="space-y-3 rounded-2xl border border-massa-border bg-fm-yellow-light p-4">
                  <li className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-5 shrink-0 text-fm-blue" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-fm-purple">
                        Quando
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-massa-text">
                        {formatEventDetailWhen(event.startsAt)}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-fm-blue" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-fm-purple">
                        Onde
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-massa-text">
                        {event.addressLine}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="mt-0.5 size-5 shrink-0 text-fm-blue" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-fm-purple">
                        Convidados
                      </p>
                      <div className="mt-1.5">
                        <EventGoingRow count={event.goingCount} preview={event.goingPreview} />
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="overflow-hidden rounded-2xl border border-massa-border bg-fm-yellow shadow-sm">
                  <div className="relative h-44 w-full bg-fm-yellow/30">
                    <iframe
                      title={`Mapa de ${event.venueName}`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=-49.35%2C-25.48%2C-49.20%2C-25.40&layer=mapnik&marker=-25.4372%2C-49.2700`}
                      className="size-full border-0 opacity-90 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-fm-purple">{event.venueName}</p>
                      <p className="truncate text-xs font-semibold text-fm-purple/80">
                        {event.city}/{event.state}
                      </p>
                    </div>
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-fm-blue px-3.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Abrir no mapa
                    </a>
                  </div>
                </div>

                <section className="space-y-2">
                  <h2 className="text-xs font-black uppercase tracking-[0.14em] text-fm-purple">
                    Sobre
                  </h2>
                  <p className="whitespace-pre-line text-[15px] font-semibold leading-relaxed text-massa-text/90">
                    {event.description}
                  </p>
                </section>

                {event.gallery.length > 0 ? (
                  <section className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-[0.14em] text-fm-purple">
                      Galeria
                    </h2>
                    <ul className="grid grid-cols-3 gap-1">
                      {event.gallery.map((url) => (
                        <li
                          key={url}
                          className="aspect-square overflow-hidden rounded-lg bg-fm-yellow-light"
                        >
                          <img src={url} alt="" className="size-full object-cover" loading="lazy" />
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <div className="flex items-center gap-2 pt-2">
                  <EventRsvpButton eventId={event.id} status={event.userRsvp} fullWidth />
                  <button
                    type="button"
                    aria-label="Compartilhar evento"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-fm-blue text-white shadow-xs transition-opacity hover:opacity-90"
                  >
                    <Share2 className="size-5 text-white" />
                  </button>
                </div>

                <p className="pb-4 text-xs font-semibold leading-relaxed text-massa-muted">
                  {event.disclaimer}
                </p>
              </div>
            </div>
          ) : null}
        </>
      }
    />
  );
}
