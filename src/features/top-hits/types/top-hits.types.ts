export type TopHitsScopeId = "brasil";

export type TopHitsScope = {
  id: TopHitsScopeId;
  label: string;
};

export type ChartTrend = "up" | "down" | "same" | "new";

export type TopSong = {
  id: string;
  rank: number;
  title: string;
  artistId: string;
  artistName: string;
  artistHandle: string;
  artistAvatarUrl: string;
  coverUrl: string;
  playCount: number;
  durationSec: number;
  trend: ChartTrend;
  trendDelta?: number;
  weeksOnChart: number;
  verified?: boolean;
};

export type TopVideo = {
  id: string;
  rank: number;
  title: string;
  artistId: string;
  artistName: string;
  artistHandle: string;
  artistAvatarUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  durationSec: number;
  trend: ChartTrend;
  trendDelta?: number;
  weeksOnChart: number;
  verified?: boolean;
};

export type TopHitsChartTabId = "songs" | "videos";

export type TopHitsCharts = {
  scope: TopHitsScope;
  updatedAt: string;
  songs: TopSong[];
  videos: TopVideo[];
};
