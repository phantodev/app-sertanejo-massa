import { unsplash } from "../../../shared/lib/unsplash.ts";
import { findMockUser, mockCurrentUser } from "../../session/services/session.mock.ts";
import type {
  ChatMessage,
  ConversationDetail,
  ConversationFilter,
  ConversationSummary,
  ExploreGroup,
  GroupInfo,
  GroupMemberRole,
  MessageReplyPreview,
} from "../types/messages.types.ts";

function user(id: string) {
  const found = findMockUser(id);
  if (!found) throw new Error(`Mock user missing: ${id}`);
  return found;
}

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}

function daysAgo(days: number, hour = 20, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const mockConversationFilters: ConversationFilter[] = [
  { id: "all", label: "Tudo" },
  { id: "unread", label: "Não lidas" },
  { id: "favorites", label: "Favoritas" },
  { id: "groups", label: "Grupos" },
];

const me = mockCurrentUser;
const andre = user("u-andre");
const namu = user("u-namu");
const carlos = user("u-carlos");
const hotbar = user("u-hotbar");
const sulsp = user("u-sulsp");
const jemhot = user("u-jemhot");

const conversations: ConversationDetail[] = [
  {
    id: "conv-grupo-massa-cwb",
    type: "group",
    title: "Massa Curitiba",
    avatarUrl: unsplash.photo("1514525253161-7a46d19cd819", 200, 200),
    subtitle: "128 membros",
    memberCount: 128,
    lastMessagePreview: `${jemhot.displayName}: Quem vai no Viola ao Vivo?`,
    lastMessageAt: hoursAgo(0.4),
    unreadCount: 3,
    pinned: true,
    muted: false,
    favorite: true,
    typing: false,
    description: "Grupo oficial da galera Massa de Curitiba. Churrasco, rodeio, viola e rolê.",
    pinnedMessageId: "m4",
    messages: [
      {
        id: "m1",
        conversationId: "conv-grupo-massa-cwb",
        kind: "system",
        body: `${namu.displayName} entrou no grupo`,
        createdAt: daysAgo(3, 18, 10),
        mine: false,
      },
      {
        id: "m2",
        conversationId: "conv-grupo-massa-cwb",
        kind: "text",
        authorId: namu.id,
        authorHandle: namu.handle,
        authorName: namu.displayName,
        authorAvatarUrl: namu.avatarUrl,
        body: "Fala galera! Alguém vai no churrasco de domingo?",
        createdAt: daysAgo(3, 18, 12),
        mine: false,
      },
      {
        id: "m3",
        conversationId: "conv-grupo-massa-cwb",
        kind: "text",
        authorId: andre.id,
        authorHandle: andre.handle,
        authorName: andre.displayName,
        authorAvatarUrl: andre.avatarUrl,
        body: "Eu vou! Levo a viola.",
        createdAt: daysAgo(3, 18, 20),
        mine: false,
        reactions: [{ emoji: "🔥", count: 4, reactedByMe: true }],
      },
      {
        id: "m4",
        conversationId: "conv-grupo-massa-cwb",
        kind: "image",
        authorId: hotbar.id,
        authorHandle: hotbar.handle,
        authorName: "HotBar",
        authorAvatarUrl: hotbar.avatarUrl,
        body: "Cartaz da noite",
        mediaUrl: unsplash.photo("1492684223066-81342ee5ff30", 900, 1200),
        createdAt: daysAgo(2, 21, 5),
        mine: false,
        pinned: true,
        reactions: [{ emoji: "❤️", count: 12, reactedByMe: false }],
      },
      {
        id: "m5",
        conversationId: "conv-grupo-massa-cwb",
        kind: "text",
        authorId: me.id,
        authorHandle: me.handle,
        authorName: me.displayName,
        authorAvatarUrl: me.avatarUrl,
        body: "Massa demais esse cartaz. Eu marco presença!",
        createdAt: daysAgo(2, 21, 18),
        mine: true,
        replyTo: {
          id: "m4",
          authorName: "HotBar",
          body: "Cartaz da noite",
        },
      },
      {
        id: "m6",
        conversationId: "conv-grupo-massa-cwb",
        kind: "text",
        authorId: jemhot.id,
        authorHandle: jemhot.handle,
        authorName: jemhot.displayName,
        authorAvatarUrl: jemhot.avatarUrl,
        body: "Quem vai no Viola ao Vivo?",
        createdAt: hoursAgo(0.4),
        mine: false,
      },
    ],
  },
  {
    id: "conv-dm-andre",
    type: "dm",
    title: andre.displayName,
    avatarUrl: andre.avatarUrl,
    verified: andre.verified,
    peerHandle: andre.handle,
    subtitle: "online",
    lastMessagePreview: "Você: Fechado, te vejo no rodeio!",
    lastMessageAt: hoursAgo(1.2),
    unreadCount: 0,
    pinned: true,
    muted: false,
    favorite: true,
    messages: [
      {
        id: "d1",
        conversationId: "conv-dm-andre",
        kind: "text",
        authorId: andre.id,
        authorHandle: andre.handle,
        authorName: andre.displayName,
        authorAvatarUrl: andre.avatarUrl,
        body: "E aí, Gold! Vai no Rodeio Night em Campinas?",
        createdAt: hoursAgo(3),
        mine: false,
      },
      {
        id: "d2",
        conversationId: "conv-dm-andre",
        kind: "text",
        authorId: me.id,
        authorHandle: me.handle,
        authorName: me.displayName,
        authorAvatarUrl: me.avatarUrl,
        body: "Vou sim. Quer ir junto?",
        createdAt: hoursAgo(2.5),
        mine: true,
      },
      {
        id: "d3",
        conversationId: "conv-dm-andre",
        kind: "audio",
        authorId: andre.id,
        authorHandle: andre.handle,
        authorName: andre.displayName,
        authorAvatarUrl: andre.avatarUrl,
        audioDurationSec: 18,
        createdAt: hoursAgo(2),
        mine: false,
      },
      {
        id: "d4",
        conversationId: "conv-dm-andre",
        kind: "text",
        authorId: me.id,
        authorHandle: me.handle,
        authorName: me.displayName,
        authorAvatarUrl: me.avatarUrl,
        body: "Fechado, te vejo no rodeio!",
        createdAt: hoursAgo(1.2),
        mine: true,
      },
    ],
  },
  {
    id: "conv-grupo-estrada",
    type: "group",
    title: "Estrada & Modão",
    avatarUrl: unsplash.photo("1501386761578-eac5c94b800a", 200, 200),
    subtitle: "64 membros",
    memberCount: 64,
    lastMessagePreview: `${sulsp.displayName}: Playlist da viagem no comentário`,
    lastMessageAt: hoursAgo(5),
    unreadCount: 8,
    pinned: false,
    muted: false,
    favorite: false,
    description: "Modão na estrada, carona e playlist da viagem.",
    messages: [
      {
        id: "g1",
        conversationId: "conv-grupo-estrada",
        kind: "text",
        authorId: sulsp.id,
        authorHandle: sulsp.handle,
        authorName: sulsp.displayName,
        authorAvatarUrl: sulsp.avatarUrl,
        body: "Quem topa uma carona até o encontro do Sul?",
        createdAt: daysAgo(1, 19, 40),
        mine: false,
      },
      {
        id: "g2",
        conversationId: "conv-grupo-estrada",
        kind: "text",
        authorId: carlos.id,
        authorHandle: carlos.handle,
        authorName: carlos.displayName,
        authorAvatarUrl: carlos.avatarUrl,
        body: "Eu e a Aline topamos. Sai de SP às 15h.",
        createdAt: daysAgo(1, 20, 5),
        mine: false,
      },
      {
        id: "g3",
        conversationId: "conv-grupo-estrada",
        kind: "system",
        body: `${jemhot.displayName} saiu do grupo`,
        createdAt: daysAgo(1, 21, 0),
        mine: false,
      },
      {
        id: "g4",
        conversationId: "conv-grupo-estrada",
        kind: "text",
        authorId: sulsp.id,
        authorHandle: sulsp.handle,
        authorName: sulsp.displayName,
        authorAvatarUrl: sulsp.avatarUrl,
        body: "Playlist da viagem no comentário",
        createdAt: hoursAgo(5),
        mine: false,
      },
    ],
  },
  {
    id: "conv-dm-namu",
    type: "dm",
    title: namu.displayName,
    avatarUrl: namu.avatarUrl,
    verified: namu.verified,
    peerHandle: namu.handle,
    lastMessagePreview: `${namu.displayName}: Te mando o endereço do sítio`,
    lastMessageAt: hoursAgo(8),
    unreadCount: 2,
    pinned: false,
    muted: false,
    favorite: true,
    typing: true,
    messages: [
      {
        id: "n1",
        conversationId: "conv-dm-namu",
        kind: "text",
        authorId: namu.id,
        authorHandle: namu.handle,
        authorName: namu.displayName,
        authorAvatarUrl: namu.avatarUrl,
        body: "Gold, confirma se vai no Churrasco & Modão?",
        createdAt: hoursAgo(9),
        mine: false,
      },
      {
        id: "n2",
        conversationId: "conv-dm-namu",
        kind: "text",
        authorId: me.id,
        authorHandle: me.handle,
        authorName: me.displayName,
        authorAvatarUrl: me.avatarUrl,
        body: "Confirmo! Levo a cerveja.",
        createdAt: hoursAgo(8.5),
        mine: true,
      },
      {
        id: "n3",
        conversationId: "conv-dm-namu",
        kind: "text",
        authorId: namu.id,
        authorHandle: namu.handle,
        authorName: namu.displayName,
        authorAvatarUrl: namu.avatarUrl,
        body: "Te mando o endereço do sítio",
        createdAt: hoursAgo(8),
        mine: false,
      },
    ],
  },
  {
    id: "conv-dm-hotbar",
    type: "dm",
    title: "HotBar",
    avatarUrl: hotbar.avatarUrl,
    verified: true,
    peerHandle: hotbar.handle,
    lastMessagePreview: "HotBar: Sua mesa está reservada 🔥",
    lastMessageAt: daysAgo(2, 14, 0),
    unreadCount: 1,
    pinned: false,
    muted: false,
    favorite: false,
    messages: [
      {
        id: "h1",
        conversationId: "conv-dm-hotbar",
        kind: "text",
        authorId: hotbar.id,
        authorHandle: hotbar.handle,
        authorName: "HotBar",
        authorAvatarUrl: hotbar.avatarUrl,
        body: "Olá! Confirmamos sua presença na Balada Sertaneja.",
        createdAt: daysAgo(2, 13, 30),
        mine: false,
      },
      {
        id: "h2",
        conversationId: "conv-dm-hotbar",
        kind: "text",
        authorId: hotbar.id,
        authorHandle: hotbar.handle,
        authorName: "HotBar",
        authorAvatarUrl: hotbar.avatarUrl,
        body: "Sua mesa está reservada 🔥",
        createdAt: daysAgo(2, 14, 0),
        mine: false,
      },
    ],
  },
  {
    id: "conv-dm-carlos",
    type: "dm",
    title: carlos.displayName,
    avatarUrl: carlos.avatarUrl,
    peerHandle: carlos.handle,
    lastMessagePreview: "Você: Combinado!",
    lastMessageAt: daysAgo(5, 22, 10),
    unreadCount: 0,
    pinned: false,
    muted: true,
    favorite: false,
    messages: [
      {
        id: "c1",
        conversationId: "conv-dm-carlos",
        kind: "text",
        authorId: carlos.id,
        authorHandle: carlos.handle,
        authorName: carlos.displayName,
        authorAvatarUrl: carlos.avatarUrl,
        body: "Bora marcar um encontro da galera de SP?",
        createdAt: daysAgo(5, 21, 40),
        mine: false,
      },
      {
        id: "c2",
        conversationId: "conv-dm-carlos",
        kind: "text",
        authorId: me.id,
        authorHandle: me.handle,
        authorName: me.displayName,
        authorAvatarUrl: me.avatarUrl,
        body: "Combinado!",
        createdAt: daysAgo(5, 22, 10),
        mine: true,
      },
    ],
  },
];

const exploreGroups: ExploreGroup[] = [
  {
    id: "explore-viola-vivo",
    title: "Viola ao Vivo BR",
    avatarUrl: unsplash.photo("1511671782779-c97d3d27a1d4", 200, 200),
    description: "Encontros, lives e open mic de viola caipira.",
    memberCount: 842,
    joined: false,
  },
  {
    id: "explore-rodeio-sp",
    title: "Rodeio SP",
    avatarUrl: unsplash.photo("1540039154509-5cddc0b15f19", 200, 200),
    description: "Agenda de rodeios e camarotes no interior paulista.",
    memberCount: 1204,
    joined: false,
  },
  {
    id: "explore-churrasco-modao",
    title: "Churrasco & Modão",
    avatarUrl: unsplash.photo("1555939594-58d7cb561ad1", 200, 200),
    description: "Quem leva a carne, quem leva a caixinha de som.",
    memberCount: 356,
    joined: true,
  },
  {
    id: "conv-grupo-massa-cwb",
    title: "Massa Curitiba",
    avatarUrl: unsplash.photo("1514525253161-7a46d19cd819", 200, 200),
    description: "Já está nas suas conversas — grupo oficial CWB.",
    memberCount: 128,
    joined: true,
  },
];

export function getMockConversations(): ConversationSummary[] {
  return conversations
    .map(
      ({ messages: _messages, pinnedMessageId: _pin, description: _desc, ...summary }) => summary,
    )
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return +new Date(b.lastMessageAt) - +new Date(a.lastMessageAt);
    });
}

export function getMockConversation(id: string): ConversationDetail | null {
  const found = conversations.find((item) => item.id === id);
  return found ? structuredClone(found) : null;
}

export function appendMockMessage(
  conversationId: string,
  body: string,
  replyTo?: MessageReplyPreview,
): ChatMessage | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;

  const message: ChatMessage = {
    id: `local-${Date.now()}`,
    conversationId,
    kind: "text",
    authorId: me.id,
    authorHandle: me.handle,
    authorName: me.displayName,
    authorAvatarUrl: me.avatarUrl,
    body,
    replyTo,
    createdAt: new Date().toISOString(),
    mine: true,
  };

  conversation.messages.push(message);
  conversation.lastMessagePreview = `Você: ${body}`;
  conversation.lastMessageAt = message.createdAt;
  conversation.unreadCount = 0;
  conversation.typing = false;
  return structuredClone(message);
}

export function appendMockAudioMessage(
  conversationId: string,
  durationSec = 8,
): ChatMessage | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;

  const message: ChatMessage = {
    id: `local-audio-${Date.now()}`,
    conversationId,
    kind: "audio",
    authorId: me.id,
    authorHandle: me.handle,
    authorName: me.displayName,
    authorAvatarUrl: me.avatarUrl,
    audioDurationSec: durationSec,
    createdAt: new Date().toISOString(),
    mine: true,
  };

  conversation.messages.push(message);
  conversation.lastMessagePreview = "Você: Áudio";
  conversation.lastMessageAt = message.createdAt;
  conversation.unreadCount = 0;
  conversation.typing = false;
  return structuredClone(message);
}

export function toggleMockReaction(
  conversationId: string,
  messageId: string,
  emoji: string,
): ChatMessage | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  const message = conversation.messages.find((item) => item.id === messageId);
  if (!message || message.kind === "system") return null;

  const reactions = [...(message.reactions ?? [])];
  const index = reactions.findIndex((item) => item.emoji === emoji);

  if (index >= 0) {
    const current = reactions[index]!;
    if (current.reactedByMe) {
      if (current.count <= 1) reactions.splice(index, 1);
      else reactions[index] = { ...current, count: current.count - 1, reactedByMe: false };
    } else {
      reactions[index] = { ...current, count: current.count + 1, reactedByMe: true };
    }
  } else {
    reactions.push({ emoji, count: 1, reactedByMe: true });
  }

  message.reactions = reactions;
  return structuredClone(message);
}

export function pinMockMessage(
  conversationId: string,
  messageId: string,
): ConversationDetail | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  const message = conversation.messages.find((item) => item.id === messageId);
  if (!message || message.kind === "system") return null;

  for (const item of conversation.messages) item.pinned = false;
  message.pinned = true;
  conversation.pinnedMessageId = messageId;
  return structuredClone(conversation);
}

export function unpinMockMessage(conversationId: string): ConversationDetail | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  for (const item of conversation.messages) item.pinned = false;
  conversation.pinnedMessageId = null;
  return structuredClone(conversation);
}

export function toggleMockMute(conversationId: string): ConversationSummary | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  conversation.muted = !conversation.muted;
  const { messages: _m, pinnedMessageId: _p, description: _d, ...summary } = conversation;
  return structuredClone(summary);
}

export function toggleMockFavorite(conversationId: string): ConversationSummary | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  conversation.favorite = !conversation.favorite;
  const { messages: _m, pinnedMessageId: _p, description: _d, ...summary } = conversation;
  return structuredClone(summary);
}

export function clearMockConversation(conversationId: string): ConversationDetail | null {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return null;
  conversation.messages = [];
  conversation.pinnedMessageId = null;
  conversation.lastMessagePreview = "Sem mensagens";
  conversation.lastMessageAt = new Date().toISOString();
  conversation.unreadCount = 0;
  return structuredClone(conversation);
}

export function getMockGroupInfo(conversationId: string): GroupInfo | null {
  const conversation = conversations.find(
    (item) => item.id === conversationId && item.type === "group",
  );
  if (!conversation) return null;

  const memberIds =
    conversationId === "conv-grupo-massa-cwb"
      ? [me.id, namu.id, andre.id, hotbar.id, jemhot.id, carlos.id]
      : [me.id, sulsp.id, carlos.id, andre.id];

  const members = memberIds.map((id, index) => {
    const found = findMockUser(id) ?? me;
    return {
      id: found.id,
      handle: found.handle,
      displayName: found.displayName,
      avatarUrl: found.avatarUrl,
      role: (index === 0 ? "admin" : "member") as GroupMemberRole,
    };
  });

  return {
    conversationId,
    title: conversation.title,
    avatarUrl: conversation.avatarUrl,
    description: conversation.description ?? "",
    memberCount: conversation.memberCount ?? members.length,
    members,
    createdAt: daysAgo(40, 12, 0),
  };
}

export function getMockExploreGroups(query = ""): ExploreGroup[] {
  const normalized = query.trim().toLowerCase();
  const list = exploreGroups.filter((group) => {
    if (!normalized) return true;
    return (
      group.title.toLowerCase().includes(normalized) ||
      group.description.toLowerCase().includes(normalized)
    );
  });
  return structuredClone(list);
}

export function joinMockExploreGroup(exploreId: string): ExploreGroup | null {
  const group = exploreGroups.find((item) => item.id === exploreId);
  if (!group) return null;
  group.joined = true;

  if (!conversations.some((item) => item.id === exploreId)) {
    conversations.unshift({
      id: exploreId,
      type: "group",
      title: group.title,
      avatarUrl: group.avatarUrl,
      subtitle: `${group.memberCount} membros`,
      memberCount: group.memberCount,
      description: group.description,
      lastMessagePreview: "Você entrou no grupo",
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      pinned: false,
      muted: false,
      favorite: false,
      messages: [
        {
          id: `sys-join-${Date.now()}`,
          conversationId: exploreId,
          kind: "system",
          body: "Você entrou no grupo",
          createdAt: new Date().toISOString(),
          mine: false,
        },
      ],
    });
  }

  return structuredClone(group);
}
