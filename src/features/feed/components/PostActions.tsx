import { Bookmark, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { FeedPost } from "../types/feed.types.ts";
import { LikedByRow } from "./LikedByRow.tsx";

type PostActionsProps = {
  post: FeedPost;
  showLikedBy?: boolean;
};

export function PostActions({ post, showLikedBy = true }: PostActionsProps) {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Curtir publicação"
          className="massa-description inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-massa-muted transition-colors hover:bg-fm-blue/10 hover:text-fm-blue"
        >
          <ThumbsUp className="size-4" />
          <span className="massa-description text-fm-blue">{post.likes}</span>
        </button>
        <Link
          to={`/${post.author.handle}/status/${post.id}`}
          aria-label="Abrir comentários da publicação"
          className="massa-description inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-massa-muted transition-colors hover:bg-fm-purple/10 hover:text-massa-text"
        >
          <MessageCircle className="size-4" />
          <span className="massa-description text-fm-blue">{post.comments}</span>
        </Link>
        <button
          type="button"
          aria-label="Salvar publicação"
          className="ml-auto grid size-9 place-items-center rounded-full text-fm-teal-dark transition-colors hover:bg-fm-teal-dark/10"
        >
          <Bookmark
            className={`size-4 text-fm-teal-dark ${post.bookmarked ? "fill-current" : ""}`}
          />
        </button>
      </div>
      {showLikedBy ? <LikedByRow likes={post.likedByPreview} totalLikes={post.likes} /> : null}
    </div>
  );
}
