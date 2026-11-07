import { Music2, Tv } from "lucide-react";
import type { TopSong, TopVideo } from "../types/top-hits.types.ts";
import { TopHitRankRow } from "./TopHitRankRow.tsx";

type TopHitsChartSectionProps =
  | { kind: "song"; title: string; items: TopSong[]; className?: string }
  | { kind: "video"; title: string; items: TopVideo[]; className?: string };

export function TopHitsChartSection(props: TopHitsChartSectionProps) {
  const { kind, title, items, className = "" } = props;
  const Icon = kind === "song" ? Music2 : Tv;

  return (
    <section className={`flex min-w-0 flex-col max-lg:min-h-0 max-lg:flex-1 ${className}`}>
      <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-massa-border bg-fm-yellow-light/95 px-4 py-3">
        <Icon className="size-4 shrink-0 text-fm-purple" aria-hidden />
        <h2 className="text-sm font-black text-fm-purple">{title}</h2>
        <span className="massa-description ml-auto text-massa-muted">Top 50</span>
      </header>
      <ol className="divide-y divide-massa-border/50 pb-20 lg:pb-4">
        {kind === "song"
          ? items.map((item) => (
              <TopHitRankRow
                key={item.id}
                kind="song"
                item={item}
                onOpen={() => {
                  /* player na próxima etapa */
                }}
              />
            ))
          : items.map((item) => (
              <TopHitRankRow
                key={item.id}
                kind="video"
                item={item}
                onOpen={() => {
                  /* player na próxima etapa */
                }}
              />
            ))}
      </ol>
    </section>
  );
}
