import { delay } from "../../../shared/lib/delay.ts";
import { messagesApi } from "../apis/messages.api.ts";
import type {
  ChatMessage,
  ConversationDetail,
  ConversationFilter,
  ConversationFilterId,
  ConversationSummary,
  ExploreGroup,
  GroupInfo,
  MessageReplyPreview,
} from "../types/messages.types.ts";
import {
  appendMockAudioMessage,
  appendMockMessage,
  clearMockConversation,
  getMockConversation,
  getMockConversations,
  getMockExploreGroups,
  getMockGroupInfo,
  joinMockExploreGroup,
  mockConversationFilters,
  pinMockMessage,
  toggleMockFavorite,
  toggleMockMute,
  toggleMockReaction,
  unpinMockMessage,
} from "./messages.mock.ts";

void messagesApi;

export async function getConversationFilters(): Promise<ConversationFilter[]> {
  await delay(60);
  return structuredClone(mockConversationFilters);
}

export async function getConversations(
  filter: ConversationFilterId = "all",
  query = "",
): Promise<ConversationSummary[]> {
  await delay();
  const normalized = query.trim().toLowerCase();
  let list = getMockConversations();

  if (filter === "unread") list = list.filter((item) => item.unreadCount > 0);
  if (filter === "groups") list = list.filter((item) => item.type === "group");
  if (filter === "favorites") list = list.filter((item) => item.favorite);

  if (normalized) {
    list = list.filter((item) => item.title.toLowerCase().includes(normalized));
  }

  return structuredClone(list);
}

export async function getConversationById(id: string): Promise<ConversationDetail> {
  await delay();
  const conversation = getMockConversation(id);
  if (!conversation) throw new Error(`Conversa não encontrada: ${id}`);
  return conversation;
}

export async function sendTextMessage(
  conversationId: string,
  body: string,
  replyTo?: MessageReplyPreview,
): Promise<ChatMessage> {
  await delay(180);
  const trimmed = body.trim();
  if (!trimmed) throw new Error("Mensagem vazia");
  const message = appendMockMessage(conversationId, trimmed, replyTo);
  if (!message) throw new Error(`Conversa não encontrada: ${conversationId}`);
  return message;
}

export async function sendAudioMessage(
  conversationId: string,
  durationSec = 8,
): Promise<ChatMessage> {
  await delay(220);
  const message = appendMockAudioMessage(conversationId, durationSec);
  if (!message) throw new Error(`Conversa não encontrada: ${conversationId}`);
  return message;
}

export async function reactToMessage(
  conversationId: string,
  messageId: string,
  emoji: string,
): Promise<ChatMessage> {
  await delay(80);
  const message = toggleMockReaction(conversationId, messageId, emoji);
  if (!message) throw new Error("Mensagem não encontrada");
  return message;
}

export async function pinMessage(
  conversationId: string,
  messageId: string,
): Promise<ConversationDetail> {
  await delay(100);
  const conversation = pinMockMessage(conversationId, messageId);
  if (!conversation) throw new Error("Não foi possível fixar a mensagem");
  return conversation;
}

export async function unpinMessage(conversationId: string): Promise<ConversationDetail> {
  await delay(80);
  const conversation = unpinMockMessage(conversationId);
  if (!conversation) throw new Error("Conversa não encontrada");
  return conversation;
}

export async function toggleMute(conversationId: string): Promise<ConversationSummary> {
  await delay(80);
  const summary = toggleMockMute(conversationId);
  if (!summary) throw new Error("Conversa não encontrada");
  return summary;
}

export async function toggleFavorite(conversationId: string): Promise<ConversationSummary> {
  await delay(80);
  const summary = toggleMockFavorite(conversationId);
  if (!summary) throw new Error("Conversa não encontrada");
  return summary;
}

export async function clearConversation(conversationId: string): Promise<ConversationDetail> {
  await delay(120);
  const conversation = clearMockConversation(conversationId);
  if (!conversation) throw new Error("Conversa não encontrada");
  return conversation;
}

export async function getGroupInfo(conversationId: string): Promise<GroupInfo> {
  await delay();
  const info = getMockGroupInfo(conversationId);
  if (!info) throw new Error("Grupo não encontrado");
  return info;
}

export async function getExploreGroups(query = ""): Promise<ExploreGroup[]> {
  await delay();
  return getMockExploreGroups(query);
}

export async function joinExploreGroup(exploreId: string): Promise<ExploreGroup> {
  await delay(200);
  const group = joinMockExploreGroup(exploreId);
  if (!group) throw new Error("Grupo não encontrado");
  return group;
}
