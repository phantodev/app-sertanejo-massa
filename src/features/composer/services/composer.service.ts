import { delay } from "../../../shared/lib/delay.ts";
import { composerApi } from "../apis/composer.api.ts";
import type { ComposerAction } from "../types/composer.types.ts";
import { mockComposerActions } from "./composer.mock.ts";

void composerApi;

export async function getComposerActions(): Promise<ComposerAction[]> {
  await delay(100);
  return structuredClone(mockComposerActions);
}
