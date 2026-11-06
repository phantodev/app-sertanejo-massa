import { delay } from "../../../shared/lib/delay.ts";
import { messagesApi } from "../apis/messages.api.ts";
import type {
  ChatMessage,
  ConversationDetail,
  ConversationFilter,
  ConversationFilterId,
  ConversationSummary,
} from "../types/messages.types.ts";
import {
  appendMockMessage,
  getMockConversation,
  getMockConversations,
  mockConversationFilters,
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

export async function sendTextMessage(conversationId: string, body: string): Promise<ChatMessage> {
  await delay(180);
  const trimmed = body.trim();
  if (!trimmed) throw new Error("Mensagem vazia");
  const message = appendMockMessage(conversationId, trimmed);
  if (!message) throw new Error(`Conversa não encontrada: ${conversationId}`);
  return message;
}
