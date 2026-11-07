import { Button } from "@heroui/react";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../../shared/lib/format-relative-time.ts";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import type { FeedPost } from "../types/feed.types.ts";
import { MediaPostBody } from "./MediaPostBody.tsx";
import { PostActions } from "./PostActions.tsx";
import { WelcomePostCard } from "./WelcomePostCard.tsx";

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
              <span className="truncate text-[15px] font-semibold text-fm-blue">
                {author.displayName}
              </span>
              {author.verified ? <VerifiedBadge size="md" /> : null}
              <span className="text-sm font-semibold text-massa-muted">
                {formatRelativeTime(post.createdAt)}
              </span>
            </div>
            <p className="truncate text-xs font-semibold text-massa-muted">
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

      {post.kind === "media" ? <MediaPostBody post={post} /> : null}

      {post.kind === "verified" || post.kind === "text" ? (
        <>
          <div
            className={`mt-3 overflow-hidden rounded-2xl ${
              post.kind === "verified"
                ? "bg-fm-purple"
                : "border border-massa-border bg-gradient-to-br from-[#3a2a1c] via-[#241910] to-[#16120f]"
            }`}
            style={
              post.kind === "verified"
                ? {
                    backgroundImage: `
                      radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, var(--fm-yellow) 35%, transparent) 0%, transparent 70%),
                      radial-gradient(circle, color-mix(in srgb, var(--fm-yellow) 18%, transparent) 1px, transparent 1px)
                    `,
                    backgroundSize: "auto, 14px 14px",
                  }
                : undefined
            }
          >
            {post.coverUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.coverUrl}
                  alt=""
                  className="size-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] to-transparent" />
              </div>
            ) : null}
            <div className="relative flex flex-col items-center gap-3 px-5 py-6 text-center">
              <UserAvatar
                name={author.displayName}
                size="lg"
                src={author.avatarUrl}
                className={
                  post.kind === "verified"
                    ? "ring-2 ring-fm-yellow/70"
                    : "ring-2 ring-massa-gold/40"
                }
              />
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    post.kind === "verified" ? "text-white" : "text-massa-text"
                  }`}
                >
                  {post.title}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    post.kind === "verified" ? "text-white/75" : "text-massa-muted"
                  }`}
                >
                  {post.body}
                </p>
              </div>
              {post.ctaLabel ? (
                post.kind === "verified" ? (
                  <span className="rounded-full border border-fm-yellow bg-fm-yellow-light px-3 py-1 text-xs font-semibold text-fm-purple">
                    {post.ctaLabel}
                  </span>
                ) : (
                  <Button size="sm" variant="secondary">
                    {post.ctaLabel}
                  </Button>
                )
              ) : null}
            </div>
          </div>
          <PostActions post={post} />
        </>
      ) : null}
    </article>
  );
}
