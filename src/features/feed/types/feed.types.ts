import type { User } from "../../session/types/session.types.ts";

export type FeedTabId = "for-you" | "friends";

export type FeedTab = {
  id: FeedTabId;
  label: string;
};

export type PostKind = "welcome" | "verified" | "text" | "media";

export type PostAuthor = Pick<
  User,
  "id" | "handle" | "displayName" | "avatarUrl" | "verified" | "city" | "state"
>;

export type PostLikePreview = {
  displayName: string;
  avatarUrl: string;
};

/** Último comentário exibido no feed (só um). */
export type PostCommentPreview = {
  authorHandle: string;
  authorDisplayName: string;
  text: string;
};

export type FeedPost = {
  id: string;
  kind: PostKind;
  author: PostAuthor;
  createdAt: string;
  title: string;
  body: string;
  coverUrl?: string;
  ctaLabel?: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  likedByPreview: PostLikePreview[];
  latestComment?: PostCommentPreview;
};

export type SurveyBanner = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};
