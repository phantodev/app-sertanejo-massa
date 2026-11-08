import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../../shared/lib/format-relative-time.ts";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import type { FeedPost } from "../types/feed.types.ts";
import { MediaPostBody } from "./MediaPostBody.tsx";
import { LikedByRow } from "./LikedByRow.tsx";
import { PostActions } from "./PostActions.tsx";
import { PostLatestComment } from "./PostLatestComment.tsx";
import { ArtistFanPagePostCard } from "./ArtistFanPagePostCard.tsx";
import { WelcomePostCard } from "./WelcomePostCard.tsx";

const MASSA_PURPLE_CARD_PATTERN = {
  backgroundImage: `
    radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, var(--fm-yellow) 35%, transparent) 0%, transparent 70%),
    radial-gradient(circle, color-mix(in srgb, var(--fm-yellow) 18%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: "auto, 14px 14px",
} as const;

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  const { author } = post;

  return (
    <article className="border-b border-massa-border px-4 py-4">
      <header className="flex items-start gap-3">
        <Link to={`/${author.handle}`} className="shrink-0">
          <UserAvatar name={author.displayName} size="md" src={author.avatarUrl} />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/${author.handle}`} className="block min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="massa-description truncate text-fm-blue">{author.displayName}</span>
              {author.verified ? <VerifiedBadge size="md" /> : null}
              <span className="massa-description text-massa-muted">
                {formatRelativeTime(post.createdAt)}
              </span>
            </div>
            <p className="massa-description truncate text-massa-muted">
              {locationLabel(author.city, author.state)}
            </p>
          </Link>
        </div>
        <button
          type="button"
          aria-label="Abrir opções da publicação"
          className="grid size-8 place-items-center rounded-full text-massa-muted hover:bg-fm-purple/10"
        >
          <Ellipsis className="size-4" />
        </button>
      </header>

      {post.kind === "welcome" ? (
        <>
          <WelcomePostCard post={post} />
          <PostActions post={post} />
        </>
      ) : null}

      {post.kind === "fan-page" ? (
        <>
          <ArtistFanPagePostCard post={post} />
          <div className="mt-3 space-y-2">
            <PostActions post={post} showLikedBy={false} />
            <LikedByRow likes={post.likedByPreview} totalLikes={post.likes} />
            {post.latestComment ? <PostLatestComment comment={post.latestComment} /> : null}
          </div>
        </>
      ) : null}

      {post.kind === "media" ? <MediaPostBody post={post} /> : null}

      {post.kind === "verified" || post.kind === "text" ? (
        <>
          <div
            className="mt-3 overflow-hidden rounded-2xl border border-fm-purple/25 bg-fm-purple"
            style={MASSA_PURPLE_CARD_PATTERN}
          >
            {post.coverUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.coverUrl}
                  alt=""
                  className="size-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fm-purple to-transparent" />
              </div>
            ) : null}
            <div className="relative flex flex-col items-center gap-3 px-5 py-8 text-center">
              <div className="rounded-full p-[3px] ring-2 ring-fm-yellow/70">
                <UserAvatar name={author.displayName} size="lg" src={author.avatarUrl} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold leading-tight text-white">{post.title}</h3>
                <p className="massa-description mx-auto mt-2 max-w-[min(100%,320px)] text-white/75">
                  {post.body}
                </p>
              </div>
              {post.ctaLabel ? (
                <span className="rounded-full border border-fm-yellow bg-fm-yellow-light px-4 py-2 text-xs font-semibold text-fm-purple">
                  {post.ctaLabel}
                </span>
              ) : null}
            </div>
          </div>
          <PostActions post={post} />
        </>
      ) : null}
    </article>
  );
}
