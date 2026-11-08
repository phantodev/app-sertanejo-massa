import { Sparkles } from "lucide-react";

/** Chip “Novo” no ranking — demais variações de tendência não são exibidas. */
export function TopHitsNewBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-fm-blue px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
      <Sparkles className="size-2.5" aria-hidden />
      <span className="mt-0.5">Novo</span>
    </span>
  );
}
