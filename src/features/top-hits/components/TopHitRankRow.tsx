import { Headphones, Play, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import { formatChartMetric, formatDuration } from "../lib/format-chart-metric.ts";
import type { TopSong, TopVideo } from "../types/top-hits.types.ts";
import { TopHitsNewBadge } from "./TopHitsTrendBadge.tsx";

type TopHitRankRowProps =
  | { kind: "song"; item: TopSong; onOpen?: () => void }
  | { kind: "video"; item: TopVideo; onOpen?: () => void };

export function TopHitRankRow({ kind, item, onOpen }: TopHitRankRowProps) {
  const isTopThree = item.rank <= 3;
  const thumb = kind === "song" ? item.coverUrl : item.thumbnailUrl;
  const metric = kind === "song" ? item.playCount : item.viewCount;
  const metricLabel = kind === "song" ? "plays" : "views";

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-fm-yellow/60"
      >
        <div className="flex w-9 shrink-0 items-center justify-center">
          <span
            className={`text-base font-black tabular-nums ${isTopThree ? "text-fm-purple" : "text-massa-muted"}`}
          >
            {item.rank}
          </span>
        </div>

        <div className="relative shrink-0">
          <img src={thumb} alt="" className="size-12 rounded-lg object-cover" loading="lazy" />
          <span className="absolute bottom-0.5 right-0.5 grid size-5 place-items-center rounded bg-black/65 text-white">
            {kind === "song" ? (
              <Play className="size-2.5 fill-current" />
            ) : (
              <Video className="size-2.5" />
            )}
          </span>
        </div>

        <div className="relative min-w-0 flex-1 pr-1">
          {item.trend === "new" ? (
            <span className="absolute right-0 top-0">
              <TopHitsNewBadge />
            </span>
          ) : null}
          <p
            className={`truncate font-black text-massa-text ${item.trend === "new" ? "pr-14" : ""}`}
          >
            {item.title}
          </p>
          <div className="mt-0.5 flex min-w-0 items-center gap-1">
            <Link
              to={`/${item.artistHandle}`}
              onClick={(event) => event.stopPropagation()}
              className="truncate text-xs font-semibold text-fm-blue hover:underline"
            >
              {item.artistName}
            </Link>
            {item.verified ? <VerifiedBadge size="sm" /> : null}
          </div>
          <p className="massa-description mt-0.5 flex flex-wrap items-center gap-x-2 text-massa-muted">
            <span className="inline-flex items-center gap-1">
              {kind === "song" ? (
                <Headphones className="size-3 shrink-0 text-fm-blue" aria-hidden />
              ) : (
                <Video className="size-3 shrink-0 text-fm-blue" aria-hidden />
              )}
              {formatChartMetric(metric)} {metricLabel}
            </span>
            <span>{formatDuration(item.durationSec)}</span>
            <span>{item.weeksOnChart} sem. no chart</span>
          </p>
        </div>
      </button>
    </li>
  );
}
