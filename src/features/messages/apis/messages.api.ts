/** Contratos HTTP futuros — hoje o service usa mocks. */
export const messagesApi = {
  conversations: "/api/messages/conversations",
  conversation: (id: string) => `/api/messages/conversations/${id}`,
  send: (id: string) => `/api/messages/conversations/${id}/messages`,
} as const;
