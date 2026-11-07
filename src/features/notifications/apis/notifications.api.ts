/** Contratos HTTP futuros — hoje o service usa mocks. */
export const notificationsApi = {
  list: "/api/notifications",
  respondToFriendRequest: (id: string) => `/api/notifications/friend-requests/${id}`,
} as const;
