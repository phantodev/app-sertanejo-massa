export type ConversationType = "dm" | "group";

export type ConversationFilterId = "all" | "unread" | "groups" | "favorites";

export type ConversationFilter = {
  id: ConversationFilterId;
  label: string;
};

export type MessageKind = "text" | "image" | "audio" | "system";

export type MessageReaction = {
  emoji: string;
  count: number;
  reactedByMe?: boolean;
};

export type MessageReplyPreview = {
  id: string;
  authorName: string;
  body: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  kind: MessageKind;
  authorId?: string;
  authorHandle?: string;
  authorName?: string;
  authorAvatarUrl?: string;
  body?: string;
  mediaUrl?: string;
  audioDurationSec?: number;
  replyTo?: MessageReplyPreview;
  reactions?: MessageReaction[];
  pinned?: boolean;
  createdAt: string;
  mine: boolean;
};

export type ConversationSummary = {
  id: string;
  type: ConversationType;
  title: string;
  avatarUrl: string;
  verified?: boolean;
  subtitle?: string;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  favorite: boolean;
  memberCount?: number;
  peerHandle?: string;
  typing?: boolean;
};

export type ConversationDetail = ConversationSummary & {
  messages: ChatMessage[];
  pinnedMessageId?: string | null;
  description?: string;
};

export type GroupMemberRole = "admin" | "member";

export type GroupMember = {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  role: GroupMemberRole;
};

export type GroupInfo = {
  conversationId: string;
  title: string;
  avatarUrl: string;
  description: string;
  memberCount: number;
  members: GroupMember[];
  createdAt: string;
};

export type ExploreGroup = {
  id: string;
  title: string;
  avatarUrl: string;
  description: string;
  memberCount: number;
  joined: boolean;
};

export const REACTION_EMOJIS = ["❤️", "🔥", "😂", "👍", "😮"] as const;
