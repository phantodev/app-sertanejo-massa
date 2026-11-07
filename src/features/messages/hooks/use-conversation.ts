import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearConversation,
  getConversationById,
  reactToMessage,
  sendAudioMessage,
  sendTextMessage,
  toggleFavorite,
  toggleMute,
} from "../services/messages.service.ts";
import type { ConversationDetail, MessageReplyPreview } from "../types/messages.types.ts";
import { messagesKeys } from "./messages.keys.ts";

export function useConversation(id: string | undefined) {
  return useQuery({
    queryKey: messagesKeys.detail(id ?? ""),
    queryFn: () => getConversationById(id!),
    enabled: Boolean(id),
  });
}

function invalidateLists(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, replyTo }: { body: string; replyTo?: MessageReplyPreview }) =>
      sendTextMessage(conversationId, body, replyTo),
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
            typing: false,
          };
        },
      );
      invalidateLists(queryClient);
    },
  });
}

export function useSendAudio(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (durationSec?: number) => sendAudioMessage(conversationId, durationSec),
    onSuccess: (message) => {
      queryClient.setQueryData<ConversationDetail>(
        messagesKeys.detail(conversationId),
        (current) => {
          if (!current) return current;
          return {
            ...current,
            messages: [...current.messages, message],
            lastMessagePreview: "Você: Áudio",
            lastMessageAt: message.createdAt,
            unreadCount: 0,
            typing: false,
          };
        },
      );
      invalidateLists(queryClient);
    },
  });
}

export function useReactToMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, emoji }: { messageId: string; emoji: string }) =>
      reactToMessage(conversationId, messageId, emoji),
    onSuccess: (message) => {
      queryClient.setQueryData<ConversationDetail>(
        messagesKeys.detail(conversationId),
        (current) => {
          if (!current) return current;
          return {
            ...current,
            messages: current.messages.map((item) => (item.id === message.id ? message : item)),
          };
        },
      );
    },
  });
}

export function useToggleMute(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleMute(conversationId),
    onSuccess: (summary) => {
      queryClient.setQueryData<ConversationDetail>(
        messagesKeys.detail(conversationId),
        (current) => (current ? { ...current, muted: summary.muted } : current),
      );
      invalidateLists(queryClient);
    },
  });
}

export function useToggleFavorite(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleFavorite(conversationId),
    onSuccess: (summary) => {
      queryClient.setQueryData<ConversationDetail>(
        messagesKeys.detail(conversationId),
        (current) => (current ? { ...current, favorite: summary.favorite } : current),
      );
      invalidateLists(queryClient);
    },
  });
}

export function useClearConversation(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearConversation(conversationId),
    onSuccess: (conversation) => {
      queryClient.setQueryData(messagesKeys.detail(conversationId), conversation);
      invalidateLists(queryClient);
    },
  });
}
