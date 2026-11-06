import { delay } from "../../../shared/lib/delay.ts";
import { feedApi } from "../apis/feed.api.ts";
import type { FeedPost, FeedTab, FeedTabId, SurveyBanner } from "../types/feed.types.ts";
import { mockFeedPosts, mockFeedTabs, mockSurveyBanner } from "./feed.mock.ts";

void feedApi;

export async function getFeedTabs(): Promise<FeedTab[]> {
  await delay(120);
  return structuredClone(mockFeedTabs);
}

export async function getFeedPosts(tab: FeedTabId = "for-you"): Promise<FeedPost[]> {
  await delay();
  if (tab === "friends") {
    return structuredClone(mockFeedPosts.filter((post) => post.author.verified));
  }
  return structuredClone(mockFeedPosts);
}

export async function getSurveyBanner(): Promise<SurveyBanner | null> {
  await delay(100);
  return structuredClone(mockSurveyBanner);
}
