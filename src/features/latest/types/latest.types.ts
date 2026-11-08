export type LatestTabId = "photos" | "videos";

export type LatestMediaKind = "photo" | "video";

export type LatestMediaItem = {
  id: string;
  kind: LatestMediaKind;
  mediaUrl: string;
  authorHandle: string;
  authorName: string;
  likeCount: number;
  likedByMe: boolean;
  /** Duração em segundos (vídeos). */
  durationSec?: number;
  postedAt: string;
};

export type LatestFeed = {
  photos: LatestMediaItem[];
  videos: LatestMediaItem[];
  updatedAt: string;
};
