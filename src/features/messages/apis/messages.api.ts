/** Contratos HTTP futuros — hoje o service usa mocks. */
export const messagesApi = {
  conversations: "/api/messages/conversations",
  conversation: (id: string) => `/api/messages/conversations/${id}`,
  send: (id: string) => `/api/messages/conversations/${id}/messages`,
  react: (id: string, messageId: string) =>
    `/api/messages/conversations/${id}/messages/${messageId}/reactions`,
  pin: (id: string) => `/api/messages/conversations/${id}/pin`,
  mute: (id: string) => `/api/messages/conversations/${id}/mute`,
  favorite: (id: string) => `/api/messages/conversations/${id}/favorite`,
  groupInfo: (id: string) => `/api/messages/groups/${id}`,
  explore: "/api/messages/groups/explore",
  join: (id: string) => `/api/messages/groups/${id}/join`,
} as const;
