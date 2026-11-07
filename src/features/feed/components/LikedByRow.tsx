import type { PostLikePreview } from "../types/feed.types.ts";

type LikedByRowProps = {
  likes: PostLikePreview[];
  totalLikes: number;
};

export function LikedByRow({ likes, totalLikes }: LikedByRowProps) {
  if (likes.length === 0 || totalLikes === 0) return null;

  const preview = likes.slice(0, 3);
  const highlight = preview[0]!.displayName;
  const hasOthers = totalLikes > 1 || likes.length > 1;

  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex items-center pl-1">
        {preview.map((person, index) => (
          <img
            key={`${person.displayName}-${index}`}
            src={person.avatarUrl}
            alt=""
            className="size-6 rounded-full border-2 border-massa-bg object-cover"
            style={{ marginLeft: index === 0 ? 0 : -8, zIndex: preview.length - index }}
            loading="lazy"
          />
        ))}
      </div>
      <p className="massa-description min-w-0 text-massa-muted">
        Curtido por <span className="font-semibold text-fm-blue">{highlight}</span>
        {hasOthers ? " e outras pessoas" : null}
      </p>
    </div>
  );
}
