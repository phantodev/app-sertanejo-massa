import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import { formatEventCardWhen } from "../lib/format-event-date.ts";
import type { EventSummary } from "../types/events.types.ts";
import { EventGoingRow } from "./EventGoingRow.tsx";
import { EventRsvpButton } from "./EventRsvpButton.tsx";

type EventCardProps = {
  event: EventSummary;
  featured?: boolean;
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const hostPrefix = event.organizer.kind === "venue" ? "no" : "por";

  return (
    <article
      className={`overflow-hidden border border-massa-border bg-fm-yellow transition-colors hover:border-massa-gold/35 ${
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
        </div>
      </Link>

      <div className="space-y-2.5 px-3.5 py-3.5">
        <div>
          <Link to={`/events/${event.id}`} className="block">
            <h3 className="text-[17px] font-bold leading-tight tracking-tight text-fm-blue">
              {event.title}
            </h3>
          </Link>
          <Link
            to={`/${event.organizer.handle}`}
            className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-massa-muted hover:text-fm-blue"
          >
            <img
              src={event.organizer.avatarUrl}
              alt=""
              className="size-5 rounded-full object-cover ring-1 ring-massa-gold/30"
            />
            <span>
              {hostPrefix}{" "}
              <span className="font-bold text-fm-blue">{event.organizer.displayName}</span>
            </span>
            {event.organizer.verified ? <VerifiedBadge size="sm" /> : null}
          </Link>
        </div>

        <div className="space-y-1">
          <p className="grid grid-cols-[14px_1fr] items-center gap-x-1.5 text-xs font-semibold text-massa-muted">
            <Clock className="size-3.5 shrink-0 text-fm-blue" aria-hidden />
            <span>{formatEventCardWhen(event.startsAt)}</span>
          </p>
          <p className="grid grid-cols-[14px_1fr] items-center gap-x-1.5 text-xs font-semibold text-massa-muted">
            <MapPin className="size-3.5 shrink-0 text-fm-blue" aria-hidden />
            <span>
              {event.venueName} — {event.city}/{event.state}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <EventGoingRow count={event.goingCount} preview={event.goingPreview} />
          <EventRsvpButton eventId={event.id} status={event.userRsvp} size="sm" />
        </div>
      </div>
    </article>
  );
}
