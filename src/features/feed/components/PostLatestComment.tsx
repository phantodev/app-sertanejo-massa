import { Link } from "react-router-dom";
import type { PostCommentPreview } from "../types/feed.types.ts";

type PostLatestCommentProps = {
  comment: PostCommentPreview;
};

export function PostLatestComment({ comment }: PostLatestCommentProps) {
  return (
    <p className="massa-description px-1 text-massa-text">
      <Link to={`/${comment.authorHandle}`} className="font-semibold text-fm-blue hover:underline">
        {comment.authorDisplayName}
      </Link>{" "}
      <span className="font-semibold text-massa-muted">{comment.text}</span>
    </p>
  );
}
