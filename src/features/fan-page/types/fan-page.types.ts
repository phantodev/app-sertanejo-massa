import type { EventSummary } from "../../events/types/events.types.ts";
import type { FeedPost, PostAuthor } from "../../feed/types/feed.types.ts";
import type { ProfileMediaItem } from "../../profile/types/profile.types.ts";

export type FanPageTabId = "posts" | "media" | "events" | "about";

export type FanPageTab = {
  id: FanPageTabId;
  label: string;
};

export type FanPageProfile = {
  handle: string;
  displayName: string;
  avatarUrl: string;
  coverUrl: string;
  category: string;
  verified: boolean;
  city: string;
  state: string;
  shortBio: string;
  about: string;
  personalHandle: string;
  personalDisplayName: string;
  joinedAt: string;
  contactEmail: string;
  websiteLabel: string;
  websiteUrl: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  highlights: string[];
  stats: {
    posts: number;
    media: number;
    events: number;
  };
  posts: FeedPost[];
  media: ProfileMediaItem[];
  events: EventSummary[];
  author: PostAuthor;
};
