import { Link } from "react-router-dom";
import { EventCard } from "../../events/components/EventCard.tsx";
import type { EventSummary } from "../../events/types/events.types.ts";

type FanPageEventsTabProps = {
  events: EventSummary[];
};

export function FanPageEventsTab({ events }: FanPageEventsTabProps) {
  if (events.length === 0) {
    return (
      <p className="px-4 py-16 text-center text-xs font-semibold text-massa-muted">
        Nenhum evento na agenda por enquanto.
      </p>
    );
  }

  return (
    <div className="space-y-4 px-4 py-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-fm-blue">Próximos shows</p>
        <Link to="/events" className="text-xs font-semibold text-fm-purple hover:underline">
          Ver todos os eventos
        </Link>
      </div>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={event.id}>
            <EventCard event={event} featured={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
