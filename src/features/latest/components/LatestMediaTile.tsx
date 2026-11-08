import { Heart, PictureInPicture2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { formatLikeCount } from "../lib/format-like-count.ts";
import type { LatestMediaItem } from "../types/latest.types.ts";

type LatestMediaTileProps = {
  item: LatestMediaItem;
  liked: boolean;
  likeCount: number;
  onToggleLike: () => void;
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function LatestMediaTile({ item, liked, likeCount, onToggleLike }: LatestMediaTileProps) {
  const isVideo = item.kind === "video";

  return (
    <article className="group relative aspect-square overflow-hidden bg-massa-border/30">
      <img
        src={item.mediaUrl}
        alt=""
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />

      {isVideo ? (
        <span className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-md bg-black/55 text-white backdrop-blur-sm">
          <PictureInPicture2 className="size-3.5" aria-hidden />
        </span>
      ) : null}

      {isVideo && item.durationSec ? (
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-white">
          <Play className="size-2.5 fill-current" aria-hidden />
          {formatDuration(item.durationSec)}
        </span>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 via-black/35 to-transparent p-2 pb-8 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
        <Link
          to={`/${item.authorHandle}`}
          className="pointer-events-auto block truncate text-xs font-bold text-white hover:underline"
          onClick={(event) => event.stopPropagation()}
        >
          @{item.authorHandle}
        </Link>
      </div>

      <button
        type="button"
        aria-label={liked ? "Descurtir" : "Curtir"}
        aria-pressed={liked}
        onClick={(event) => {
          event.stopPropagation();
          onToggleLike();
        }}
        className={`absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold shadow-sm transition-colors ${
          liked
            ? "bg-fm-purple text-white"
            : "bg-black/55 text-white backdrop-blur-sm hover:bg-black/70"
        }`}
      >
        <Heart className={`size-3.5 ${liked ? "fill-current" : ""}`} aria-hidden />
        <span>{formatLikeCount(likeCount)}</span>
      </button>
    </article>
  );
}
