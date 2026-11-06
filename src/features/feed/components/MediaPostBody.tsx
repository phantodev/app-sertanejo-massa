import { Link } from "react-router-dom";
import type { FeedPost } from "../types/feed.types.ts";
import { LikedByRow } from "./LikedByRow.tsx";
import { PostActions } from "./PostActions.tsx";
import { PostLatestComment } from "./PostLatestComment.tsx";

type MediaPostBodyProps = {
  post: FeedPost;
};

export function MediaPostBody({ post }: MediaPostBodyProps) {
  return (
    <div className="mt-3 space-y-3">
      {post.coverUrl ? (
        <div className="overflow-hidden rounded-xl border border-massa-border">
          <img
            src={post.coverUrl}
            alt=""
            className="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
            loading="lazy"
          />
        </div>
      ) : null}

      <PostActions post={post} showLikedBy={false} />

      <LikedByRow likes={post.likedByPreview} totalLikes={post.likes} />

      <p className="whitespace-pre-line px-1 text-[14px] leading-relaxed text-massa-text">
        <Link to={`/${post.author.handle}`} className="font-semibold hover:underline">
          {post.author.displayName}
        </Link>{" "}
        {post.body}
      </p>

      {post.latestComment ? <PostLatestComment comment={post.latestComment} /> : null}

      {post.comments > 1 ? (
        <Link
          to={`/${post.author.handle}/status/${post.id}`}
          className="block px-1 text-[13px] text-massa-muted hover:text-massa-text"
        >
          Ver todos os {post.comments} comentários
        </Link>
      ) : null}
    </div>
  );
}
