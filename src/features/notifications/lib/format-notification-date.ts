const DAY = 24 * 60 * 60 * 1000;

export function formatRequestDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" }).format(
    new Date(isoDate),
  );
}

export function formatEventNotificationDate(isoDate: string, now = Date.now()): string {
  const date = new Date(isoDate);
  const days = Math.floor((now - date.getTime()) / DAY);
  if (days >= 0 && days < 7) return `${days}d`;
  return formatRequestDate(isoDate);
}
