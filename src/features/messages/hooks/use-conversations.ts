import { useQuery } from "@tanstack/react-query";
import { getConversationFilters, getConversations } from "../services/messages.service.ts";
import type { ConversationFilterId } from "../types/messages.types.ts";
import { messagesKeys } from "./messages.keys.ts";

export function useConversationFilters() {
  return useQuery({
    queryKey: messagesKeys.filters(),
    queryFn: getConversationFilters,
  });
}

export function useConversations(filter: ConversationFilterId, query: string) {
  return useQuery({
    queryKey: messagesKeys.list(filter, query),
    queryFn: () => getConversations(filter, query),
  });
}
