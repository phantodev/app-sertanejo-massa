import { delay } from "../../../shared/lib/delay.ts";
import { storiesApi } from "../apis/stories.api.ts";
import type { StoryItem } from "../types/stories.types.ts";
import { mockStories } from "./stories.mock.ts";

void storiesApi;

export async function getStories(): Promise<StoryItem[]> {
  await delay();
  return structuredClone(mockStories);
}
