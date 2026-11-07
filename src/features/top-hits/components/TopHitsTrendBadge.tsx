import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import type { ChartTrend } from "../types/top-hits.types.ts";

type TopHitsTrendBadgeProps = {
  trend: ChartTrend;
  delta?: number;
};

export function TopHitsTrendBadge({ trend, delta }: TopHitsTrendBadgeProps) {
  if (trend === "new") {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-fm-purple/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fm-purple">
        <Sparkles className="size-2.5" aria-hidden />
        Novo
      </span>
    );
  }

  if (trend === "same") {
    return (
      <span className="inline-flex items-center text-massa-muted" title="Estável">
        <Minus className="size-3.5" aria-hidden />
        <span className="sr-only">Estável</span>
      </span>
    );
  }

  const up = trend === "up";
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${up ? "text-fm-teal-dark" : "text-red-600"}`}
    >
      {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
      {delta ? delta : null}
    </span>
  );
}
