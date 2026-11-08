/** Contagem compacta para curtidas (pt-BR). */
export function formatLikeCount(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) {
    const compact = value / 1000;
    const formatted = compact >= 10 ? Math.round(compact) : Math.round(compact * 10) / 10;
    return `${String(formatted).replace(".", ",")} mil`;
  }
  const compact = value / 1_000_000;
  const formatted = compact >= 10 ? Math.round(compact) : Math.round(compact * 10) / 10;
  return `${String(formatted).replace(".", ",")} mi`;
}
