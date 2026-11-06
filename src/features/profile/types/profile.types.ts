import type { FeedPost } from "../../feed/types/feed.types.ts";
import type { User } from "../../session/types/session.types.ts";

export type FriendshipStatus = "none" | "pending" | "friends" | "self";

export type ProfileTabId = "posts" | "media" | "about";

export type ProfileTab = {
  id: ProfileTabId;
  label: string;
};

export type ProfileMediaItem = {
  id: string;
  postId: string;
  type: "photo" | "video";
  url: string;
  createdAt: string;
};

export type UserProfile = {
  user: User;
  coverUrl: string;
  bio: string;
  joinedAt: string;
  friendshipStatus: FriendshipStatus;
  stats: {
    posts: number;
    friends: number;
    media: number;
  };
  posts: FeedPost[];
  media: ProfileMediaItem[];
};
