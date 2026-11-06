import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversationById, sendTextMessage } from "../services/messages.service.ts";
import type { ConversationDetail } from "../types/messages.types.ts";
import { messagesKeys } from "./messages.keys.ts";

export function useConversation(id: string | undefined) {
  return useQuery({
    queryKey: messagesKeys.detail(id ?? ""),
    queryFn: () => getConversationById(id!),
    enabled: Boolean(id),
  });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => sendTextMessage(conversationId, body),
    onSuccess: (message) => {
      queryClient.setQueryData<ConversationDetail>(
        messagesKeys.detail(conversationId),
        (current) => {
          if (!current) return current;
          return {
            ...current,
            messages: [...current.messages, message],
            lastMessagePreview: `Você: ${message.body ?? ""}`,
            lastMessageAt: message.createdAt,
            unreadCount: 0,
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
    },
  });
}
