import { useCallback, useEffect, useState } from "react";
import type { LatestMediaItem } from "../types/latest.types.ts";
import { LatestMediaTile } from "./LatestMediaTile.tsx";

type LikeState = Record<string, { count: number; liked: boolean }>;

function buildLikeState(items: LatestMediaItem[]): LikeState {
  return Object.fromEntries(
    items.map((item) => [item.id, { count: item.likeCount, liked: item.likedByMe }]),
  );
}

type LatestMediaGridProps = {
  items: LatestMediaItem[];
};

export function LatestMediaGrid({ items }: LatestMediaGridProps) {
  const [likes, setLikes] = useState<LikeState>(() => buildLikeState(items));

  useEffect(() => {
    setLikes(buildLikeState(items));
  }, [items]);

  const toggleLike = useCallback((id: string) => {
    setLikes((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const liked = !current.liked;
      return {
        ...prev,
        [id]: {
          liked,
          count: liked ? current.count + 1 : Math.max(0, current.count - 1),
        },
      };
    });
  }, []);

  if (items.length === 0) {
    return (
      <p className="px-4 py-16 text-center massa-description text-massa-muted">
        Nada por aqui ainda. Seja o primeiro a publicar!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 bg-massa-border/40 sm:gap-1">
      {items.map((item) => {
        const state = likes[item.id] ?? { count: item.likeCount, liked: item.likedByMe };
        return (
          <LatestMediaTile
            key={item.id}
            item={item}
            likeCount={state.count}
            liked={state.liked}
            onToggleLike={() => toggleLike(item.id)}
          />
        );
      })}
    </div>
  );
}
