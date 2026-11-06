import { BadgeCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatEventBadge, formatEventCardWhen } from "../lib/format-event-date.ts";
import type { EventSummary } from "../types/events.types.ts";
import { EventGoingRow } from "./EventGoingRow.tsx";
import { EventRsvpButton } from "./EventRsvpButton.tsx";

type EventCardProps = {
  event: EventSummary;
  featured?: boolean;
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const badge = formatEventBadge(event.startsAt);
  const hostPrefix = event.organizer.kind === "venue" ? "no" : "por";

  return (
    <article
      className={`overflow-hidden border border-massa-border bg-[#14110f] transition-colors hover:border-massa-gold/35 ${
        featured ? "rounded-2xl" : "rounded-xl"
      }`}
    >
      <Link
        to={`/events/${event.id}`}
        className="relative block overflow-hidden"
        aria-label={`Abrir o evento ${event.title}`}
      >
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[16/9]"}`}
        >
          <img
            src={event.coverUrl}
            alt=""
            className="size-full object-cover transition duration-700 hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b]/via-transparent to-black/25" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="rounded-md bg-[#0e0c0b]/80 px-2 py-1 text-[11px] font-bold tracking-wide text-massa-text backdrop-blur-sm">
              {badge.day} {badge.month}
            </span>
            {featured ? (
              <span className="rounded-md bg-massa-gold px-2 py-1 text-[11px] font-bold text-[#1a100b]">
                Destaque
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="space-y-2.5 px-3.5 py-3.5">
        <div>
          <Link to={`/events/${event.id}`} className="block">
            <h3 className="text-[17px] font-bold leading-tight tracking-tight text-massa-text">
              {event.title}
            </h3>
          </Link>
          <Link
            to={`/${event.organizer.handle}`}
            className="mt-1.5 flex items-center gap-2 text-sm text-massa-muted hover:text-massa-gold"
          >
            <img
              src={event.organizer.avatarUrl}
              alt=""
              className="size-5 rounded-full object-cover ring-1 ring-massa-gold/30"
            />
            <span>
              {hostPrefix}{" "}
              <span className="font-semibold text-massa-text">{event.organizer.displayName}</span>
            </span>
            {event.organizer.verified ? (
              <BadgeCheck className="size-3.5 fill-massa-gold text-accent-foreground" />
            ) : null}
          </Link>
        </div>

        <p className="text-[13px] text-massa-muted">{formatEventCardWhen(event.startsAt)}</p>
        <p className="flex items-start gap-1.5 text-[13px] text-massa-muted">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-massa-gold/80" />
          <span>
            {event.venueName} — {event.city}/{event.state}
          </span>
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <EventGoingRow count={event.goingCount} preview={event.goingPreview} />
          <EventRsvpButton eventId={event.id} status={event.userRsvp} size="sm" />
        </div>
      </div>
    </article>
  );
}
