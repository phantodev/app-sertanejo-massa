import { Link } from "react-router-dom";
import type { PostCommentPreview } from "../types/feed.types.ts";

type PostLatestCommentProps = {
  comment: PostCommentPreview;
};

export function PostLatestComment({ comment }: PostLatestCommentProps) {
  return (
    <p className="px-1 text-[13px] leading-snug text-massa-text">
      <Link to={`/${comment.authorHandle}`} className="font-semibold hover:underline">
        {comment.authorDisplayName}
      </Link>{" "}
      <span className="text-massa-muted">{comment.text}</span>
    </p>
  );
}
