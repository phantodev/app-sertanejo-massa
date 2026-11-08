import type { LatestFeed } from "../types/latest.types.ts";
import { getMockLatestFeed } from "./latest.mock.ts";

export async function getLatestFeed(): Promise<LatestFeed> {
  await new Promise((resolve) => setTimeout(resolve, 280));
  return getMockLatestFeed();
}
