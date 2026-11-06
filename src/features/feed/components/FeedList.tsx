import type { FeedPost } from "../types/feed.types.ts";
import { PostCard } from "./PostCard.tsx";

type FeedListProps = {
  posts: FeedPost[];
};

export function FeedList({ posts }: FeedListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
