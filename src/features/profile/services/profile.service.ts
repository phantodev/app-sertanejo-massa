import { delay } from "../../../shared/lib/delay.ts";
import { profileApi } from "../apis/profile.api.ts";
import type { UserProfile } from "../types/profile.types.ts";
import { buildMockProfile } from "./profile.mock.ts";

void profileApi;

export async function getProfileByHandle(handle: string): Promise<UserProfile> {
  await delay();
  const profile = buildMockProfile(handle);
  if (!profile) {
    throw new Error(`Perfil não encontrado: ${handle}`);
  }
  return structuredClone(profile);
}
