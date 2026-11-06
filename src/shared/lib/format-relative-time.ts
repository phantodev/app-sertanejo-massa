const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatRelativeTime(isoDate: string, now = Date.now()): string {
  const diff = Math.max(0, now - new Date(isoDate).getTime());

  if (diff < HOUR) {
    const minutes = Math.max(1, Math.floor(diff / MINUTE));
    return `${minutes}min`;
  }

  if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}h`;
  }

  return `${Math.floor(diff / DAY)}d`;
}
