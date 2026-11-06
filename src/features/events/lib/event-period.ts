import type { EventPeriod } from "../types/events.types.ts";

export const EVENT_PERIOD_LABELS: Record<EventPeriod, string> = {
  madrugada: "Madrugada",
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite",
};

export function periodFromHour(hour: number): EventPeriod {
  if (hour < 6) return "madrugada";
  if (hour < 12) return "manha";
  if (hour < 18) return "tarde";
  return "noite";
}
