import { findMockUser } from "../../session/services/session.mock.ts";
import type { Suggestion } from "../types/suggestions.types.ts";

function suggestionFrom(userId: string): Suggestion {
  const user = findMockUser(userId);
  if (!user) {
    throw new Error(`Mock user not found: ${userId}`);
  }

  return {
    id: `suggestion-${user.id}`,
    user: {
      id: user.id,
      handle: user.handle,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      verified: user.verified,
      city: user.city,
      state: user.state,
    },
  };
}

export const mockSuggestions: Suggestion[] = [
  suggestionFrom("u-ljsecret"),
  suggestionFrom("u-safada10"),
  suggestionFrom("u-sulsp"),
  suggestionFrom("u-jagff"),
  suggestionFrom("u-namu"),
  suggestionFrom("u-andre"),
];
