const weekdayShort = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const weekdayLong = new Intl.DateTimeFormat("pt-BR", { weekday: "long" });
const dayMonth = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
const monthShort = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const fullDate = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function cleanWeekday(value: string) {
  return value.replace(".", "");
}

export function formatEventCardWhen(iso: string): string {
  const date = new Date(iso);
  const weekday = cleanWeekday(weekdayShort.format(date));
  const dm = dayMonth.format(date).replace(" de ", " de ");
  return `${weekday}, ${dm} · ${timeFmt.format(date)}`;
}

export function formatEventDetailWhen(iso: string): string {
  const date = new Date(iso);
  const weekday = weekdayLong.format(date);
  const rest = fullDate.format(date).replace(/^[^,]+,\s*/, "");
  return `${weekday}, ${rest} às ${timeFmt.format(date)}`;
}

export function formatEventBadge(iso: string): { day: string; month: string } {
  const date = new Date(iso);
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthShort.format(date).replace(".", "").toUpperCase(),
  };
}
