import { Button } from "@heroui/react";
import { BadgeCheck, Ellipsis } from "lucide-react";
import { formatRelativeTime } from "../../../shared/lib/format-relative-time.ts";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { FeedPost } from "../types/feed.types.ts";
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
        <a href={`/${author.handle}`} className="shrink-0">
          <UserAvatar name={author.displayName} size="md" src={author.avatarUrl} />
        </a>
        <div className="min-w-0 flex-1">
          <a href={`/${author.handle}`} className="block min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold text-massa-text">
                {author.displayName}
              </span>
              {author.verified ? (
                <BadgeCheck
                  aria-label="Conta verificada"
                  className="size-4 shrink-0 fill-massa-gold text-accent-foreground"
                />
              ) : null}
              <span className="text-sm text-massa-muted">{formatRelativeTime(post.createdAt)}</span>
            </div>
            <p className="truncate text-xs text-massa-muted">
              {locationLabel(author.city, author.state)}
            </p>
          </a>
        </div>
        <button
          type="button"
          aria-label="Abrir opções da publicação"
          className="grid size-8 place-items-center rounded-full text-massa-muted hover:bg-white/5"
        >
          <Ellipsis className="size-4" />
        </button>
      </header>

      {post.kind === "welcome" ? (
        <WelcomePostCard post={post} />
      ) : (
        <div
          className={`mt-3 overflow-hidden rounded-2xl border border-massa-border ${
            post.kind === "verified"
              ? "bg-gradient-to-br from-[#2a2118] via-[#1b1714] to-[#12100e]"
              : "bg-gradient-to-br from-[#3a2a1c] via-[#241910] to-[#16120f]"
          }`}
        >
          {post.coverUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={post.coverUrl}
                alt=""
                className="size-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b]/ to-transparent" />
            </div>
          ) : null}
          <div className="relative flex flex-col items-center gap-3 px-5 py-6 text-center">
            <UserAvatar
              name={author.displayName}
              size="lg"
              src={author.avatarUrl}
              className="ring-2 ring-massa-gold/40"
            />
            <div>
              <h3 className="text-lg font-semibold text-massa-text">{post.title}</h3>
              <p className="mt-1 text-sm text-massa-muted">{post.body}</p>
            </div>
            {post.ctaLabel ? (
              post.kind === "verified" ? (
                <span className="rounded-full border border-massa-gold/40 bg-massa-gold/10 px-3 py-1 text-xs font-semibold text-massa-gold">
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
      )}

      <PostActions post={post} />
    </article>
  );
}
