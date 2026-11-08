import { delay } from "../../../shared/lib/delay.ts";
import type { FanPageProfile } from "../types/fan-page.types.ts";
import { buildMockFanPage } from "./fan-page.mock.ts";

export async function getFanPageByHandle(handle: string): Promise<FanPageProfile> {
  await delay();
  const page = buildMockFanPage(handle);
  if (!page) {
    throw new Error(`Fan Page não encontrada: ${handle}`);
  }
  return page;
}
