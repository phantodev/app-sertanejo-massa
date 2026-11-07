import { delay } from "../../../shared/lib/delay.ts";
import { notificationsApi } from "../apis/notifications.api.ts";
import type {
  FriendRequestResponse,
  Notification,
  NotificationSection,
} from "../types/notifications.types.ts";
import { getMockNotifications, respondToMockFriendRequest } from "./notifications.mock.ts";

void notificationsApi;

const DAY = 24 * 60 * 60 * 1000;

export async function getNotificationSections(): Promise<NotificationSection[]> {
  await delay();

  const now = Date.now();
  const notifications = getMockNotifications();
  const pendingRequests = notifications.filter(
    (item) => item.kind === "friend-request" && item.status === "pending",
  );
  const eventInvites = notifications
    .filter((item) => item.kind === "event-invite")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const lastSevenDays = eventInvites.filter(
    (item) => now - new Date(item.createdAt).getTime() <= 7 * DAY,
  );
  const lastThirtyDays = eventInvites.filter((item) => {
    const age = now - new Date(item.createdAt).getTime();
    return age > 7 * DAY && age <= 30 * DAY;
  });

  const sections: NotificationSection[] = [
    { id: "friend-requests", title: "Amizades", notifications: pendingRequests },
    { id: "last-7-days", title: "Últimos 7 dias", notifications: lastSevenDays },
    { id: "last-30-days", title: "Últimos 30 dias", notifications: lastThirtyDays },
  ];

  return structuredClone(sections.filter((section) => section.notifications.length > 0));
}

export async function respondToFriendRequest(
  id: string,
  response: FriendRequestResponse,
): Promise<Notification> {
  await delay(120);
  const updated = respondToMockFriendRequest(id, response);
  if (!updated) throw new Error("Solicitação de amizade não encontrada");
  return structuredClone(updated);
}
