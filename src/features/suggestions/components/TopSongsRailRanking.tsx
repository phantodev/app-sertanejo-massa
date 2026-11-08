import { Spinner } from "@heroui/react";
import { Headphones, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatChartMetric } from "../../top-hits/lib/format-chart-metric.ts";
import { useTopHitsCharts } from "../../top-hits/hooks/use-top-hits.ts";

export function TopSongsRailRanking() {
  const charts = useTopHitsCharts("brasil");
  const songs = charts.data?.songs.slice(0, 5) ?? [];

  return (
    <section
      aria-label="Top 5 músicas mais ouvidas"
      className="rounded-2xl border border-fm-purple/15 bg-fm-yellow-light p-4"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fm-blue">
            Massa Charts
          </p>
          <h2 className="flex items-center gap-1.5 text-base font-semibold text-massa-text">
            <Music2 className="size-4 text-fm-purple" aria-hidden />
            Top 5 músicas
          </h2>
        </div>
        <Link
          to="/ranking"
          className="shrink-0 text-sm font-bold text-fm-purple hover:text-fm-purple-dark"
        >
          Ver ranking
        </Link>
      </div>

      {charts.isLoading ? (
        <div className="flex justify-center py-8 text-massa-muted">
          <Spinner color="current" size="sm" />
        </div>
      ) : null}

      {charts.isError || (!charts.isLoading && songs.length === 0) ? (
        <p className="py-6 text-center text-xs font-semibold text-massa-muted">
          Ranking indisponível agora.
        </p>
      ) : null}

      {!charts.isLoading && songs.length > 0 ? (
        <ol className="divide-y divide-massa-border/60">
          {songs.map((song) => {
            const isTopThree = song.rank <= 3;
            return (
              <li key={song.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 py-2.5 text-left transition-colors hover:bg-fm-yellow/55"
                >
                  <span
                    className={`w-6 shrink-0 text-center text-sm font-black tabular-nums ${
                      isTopThree ? "text-fm-purple" : "text-massa-muted"
                    }`}
                  >
                    {song.rank}
                  </span>
                  <img
                    src={song.coverUrl}
                    alt=""
                    className="size-10 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-massa-text">
                      {song.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] font-semibold text-fm-blue">
                      {song.artistName}
                    </span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-massa-muted">
                      <Headphones className="size-3 text-fm-blue" aria-hidden />
                      {formatChartMetric(song.playCount)} plays
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}
    </section>
  );
}
