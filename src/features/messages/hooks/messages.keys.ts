import type { ConversationFilterId } from "../types/messages.types.ts";

export const messagesKeys = {
  all: ["messages"] as const,
  filters: () => [...messagesKeys.all, "filters"] as const,
  lists: () => [...messagesKeys.all, "list"] as const,
  list: (filter: ConversationFilterId, query: string) =>
    [...messagesKeys.lists(), filter, query] as const,
  details: () => [...messagesKeys.all, "detail"] as const,
  detail: (id: string) => [...messagesKeys.details(), id] as const,
  groupInfo: (id: string) => [...messagesKeys.all, "group-info", id] as const,
  explore: (query: string) => [...messagesKeys.all, "explore", query] as const,
};
