import { delay } from "../../../shared/lib/delay.ts";
import { sessionApi } from "../apis/session.api.ts";
import type { CurrentUser } from "../types/session.types.ts";
import { mockCurrentUser } from "./session.mock.ts";

void sessionApi;

export async function getCurrentUser(): Promise<CurrentUser> {
  await delay();
  return structuredClone(mockCurrentUser);
}
