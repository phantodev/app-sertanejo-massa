import { Bookmark, Flame, MessageCircle } from "lucide-react";
import type { FeedPost } from "../types/feed.types.ts";

type PostActionsProps = {
  post: FeedPost;
};

export function PostActions({ post }: PostActionsProps) {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Curtir publicação"
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-massa-muted transition-colors hover:bg-massa-gold/10 hover:text-massa-gold"
        >
          <Flame className="size-4" />
          <span>{post.likes}</span>
        </button>
        <a
          href={`/${post.author.handle}/status/${post.id}`}
          aria-label="Abrir comentários da publicação"
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-massa-muted transition-colors hover:bg-white/5 hover:text-massa-text"
        >
          <MessageCircle className="size-4" />
          <span>{post.comments}</span>
        </a>
        <button
          type="button"
          aria-label="Salvar publicação"
          className="ml-auto grid size-9 place-items-center rounded-full text-massa-muted transition-colors hover:bg-white/5 hover:text-massa-gold"
        >
          <Bookmark className={`size-4 ${post.bookmarked ? "fill-current text-massa-gold" : ""}`} />
        </button>
      </div>
      {post.likedByPreview.length > 0 ? (
        <p className="px-1 text-xs text-massa-muted">
          Curtido por <span className="font-medium text-massa-text">{post.likedByPreview[0]}</span>
          {post.likedByPreview.length > 1 ? " e outras pessoas" : null}
        </p>
      ) : null}
    </div>
  );
}
