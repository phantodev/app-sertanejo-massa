import { delay } from "../../../shared/lib/delay.ts";
import { suggestionsApi } from "../apis/suggestions.api.ts";
import type { Suggestion } from "../types/suggestions.types.ts";
import { mockSuggestions } from "./suggestions.mock.ts";

void suggestionsApi;

export async function getSuggestions(): Promise<Suggestion[]> {
  await delay();
  return structuredClone(mockSuggestions);
}
