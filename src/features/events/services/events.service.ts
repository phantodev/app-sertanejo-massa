import { delay } from "../../../shared/lib/delay.ts";
import { eventsApi } from "../apis/events.api.ts";
import type {
  EventDetail,
  EventFilterOptions,
  EventFilters,
  EventListSection,
  EventRsvpStatus,
  EventSummary,
} from "../types/events.types.ts";
import { buildFilterOptions, mockEvents, toSummary } from "./events.mock.ts";

void eventsApi;

const DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function matchesFilters(event: EventDetail, filters: EventFilters): boolean {
  if (filters.period && event.period !== filters.period) return false;
  if (filters.state && event.state !== filters.state) return false;
  if (filters.city && event.city !== filters.city) return false;
  return true;
}

function groupIntoSections(events: EventSummary[]): EventListSection[] {
  const now = startOfDay(new Date()).getTime();
  const weekEnd = now + 7 * DAY;
  const monthEnd = now + 31 * DAY;

  const featured = events.filter((event) => event.featured);
  const thisWeek = events.filter((event) => {
    const t = new Date(event.startsAt).getTime();
    return t >= now && t < weekEnd && !event.featured;
  });
  const thisMonth = events.filter((event) => {
    const t = new Date(event.startsAt).getTime();
    return t >= weekEnd && t < monthEnd;
  });
  const later = events.filter((event) => {
    const t = new Date(event.startsAt).getTime();
    return t >= monthEnd;
  });

  const sections: EventListSection[] = [];
  if (featured.length) sections.push({ id: "featured", title: "Em destaque", events: featured });
  if (thisWeek.length) sections.push({ id: "this-week", title: "Esta semana", events: thisWeek });
  if (thisMonth.length) sections.push({ id: "this-month", title: "Este mês", events: thisMonth });
  if (later.length) sections.push({ id: "later", title: "Mais à frente", events: later });

  // Fallback: se filtros zeram as seções, joga tudo numa lista única
  if (sections.length === 0 && events.length > 0) {
    sections.push({ id: "this-week", title: "Resultados", events });
  }

  return sections;
}

export async function getEventFilterOptions(): Promise<EventFilterOptions> {
  await delay(80);
  return structuredClone(buildFilterOptions(mockEvents));
}

export async function getEventSections(
  filters: EventFilters = { period: null, state: null, city: null },
): Promise<EventListSection[]> {
  await delay();
  const filtered = mockEvents
    .filter((event) => matchesFilters(event, filters))
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .map(toSummary);
  return structuredClone(groupIntoSections(filtered));
}

export async function getEventById(id: string): Promise<EventDetail> {
  await delay();
  const event = mockEvents.find((item) => item.id === id || item.slug === id);
  if (!event) throw new Error(`Evento não encontrado: ${id}`);
  return structuredClone(event);
}

/** Mock local de RSVP — na integração real vira POST /rsvp. */
export async function setEventRsvp(id: string, status: EventRsvpStatus): Promise<EventDetail> {
  await delay(120);
  const event = mockEvents.find((item) => item.id === id || item.slug === id);
  if (!event) throw new Error(`Evento não encontrado: ${id}`);

  const wasGoing = event.userRsvp === "going";
  const willGo = status === "going";

  if (!wasGoing && willGo) event.goingCount += 1;
  if (wasGoing && !willGo) event.goingCount = Math.max(0, event.goingCount - 1);

  event.userRsvp = status;
  return structuredClone(event);
}
