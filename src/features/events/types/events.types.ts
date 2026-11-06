import type { User } from "../../session/types/session.types.ts";

/** Faixa do dia — espelha o filtro da HTS. */
export type EventPeriod = "madrugada" | "manha" | "tarde" | "noite";

export type EventRsvpStatus = "none" | "going";

export type EventOrganizerKind = "person" | "venue";

export type EventOrganizer = Pick<
  User,
  "id" | "handle" | "displayName" | "avatarUrl" | "verified" | "city" | "state"
> & {
  kind: EventOrganizerKind;
};

export type EventAttendeePreview = {
  displayName: string;
  avatarUrl: string;
};

/** Item de listagem — contrato estável pra futura API/DB. */
export type EventSummary = {
  id: string;
  slug: string;
  title: string;
  coverUrl: string;
  startsAt: string;
  period: EventPeriod;
  venueName: string;
  city: string;
  state: string;
  featured: boolean;
  goingCount: number;
  goingPreview: EventAttendeePreview[];
  organizer: EventOrganizer;
  userRsvp: EventRsvpStatus;
};

/** Detalhe completo — estende o summary com campos da página. */
export type EventDetail = EventSummary & {
  description: string;
  addressLine: string;
  mapUrl: string;
  disclaimer: string;
  gallery: string[];
};

export type EventListSectionId = "featured" | "this-week" | "this-month" | "later";

export type EventListSection = {
  id: EventListSectionId;
  title: string;
  events: EventSummary[];
};

export type EventFilters = {
  period: EventPeriod | null;
  state: string | null;
  city: string | null;
};

export type EventFilterOptions = {
  states: string[];
  citiesByState: Record<string, string[]>;
  periods: Array<{ id: EventPeriod; label: string }>;
};
