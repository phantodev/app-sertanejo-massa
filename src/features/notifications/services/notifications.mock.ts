import { mockEvents } from "../../events/services/events.mock.ts";
import { findMockUser } from "../../session/services/session.mock.ts";
import type {
  EventInviteNotification,
  FriendRequestNotification,
  FriendRequestResponse,
  Notification,
  NotificationActor,
} from "../types/notifications.types.ts";

function actorFromUser(
  userId: string,
  overrides: Partial<Pick<NotificationActor, "displayName" | "city" | "state">> = {},
): NotificationActor {
  const user = findMockUser(userId);
  if (!user) throw new Error(`Mock user not found: ${userId}`);

  return {
    id: user.id,
    handle: user.handle,
    displayName: overrides.displayName ?? user.displayName,
    avatarUrl: user.avatarUrl,
    verified: user.verified,
    city: overrides.city ?? user.city,
    state: overrides.state ?? user.state,
  };
}

function daysAgo(days: number, hour = 12): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function eventInvite(id: string, eventId: string, days: number): EventInviteNotification {
  const event = mockEvents.find((item) => item.id === eventId);
  if (!event) throw new Error(`Mock event not found: ${eventId}`);

  return {
    id,
    kind: "event-invite",
    actor: actorFromUser("u-hotbar", { displayName: "Woods Bar" }),
    event: {
      id: event.id,
      slug: event.slug,
      title: event.title,
      coverUrl: event.coverUrl,
    },
    createdAt: daysAgo(days),
  };
}

const friendRequests: FriendRequestNotification[] = [
  {
    id: "notification-friend-casarelrema",
    kind: "friend-request",
    actor: actorFromUser("u-carlos", {
      displayName: "CasaRelReMa",
      city: "São Paulo",
      state: "SP",
    }),
    createdAt: daysAgo(44),
    status: "pending",
  },
  {
    id: "notification-friend-leonardo",
    kind: "friend-request",
    actor: actorFromUser("u-andre", {
      displayName: "Leonardo",
      city: "Presidente Prudente",
      state: "SP",
    }),
    createdAt: daysAgo(53),
    status: "pending",
  },
];

const eventInvites: EventInviteNotification[] = [
  eventInvite("notification-event-balada", "evt-balada-sertaneja-sp", 3),
  eventInvite("notification-event-viola", "evt-viola-ao-vivo", 3),
  eventInvite("notification-event-churrasco", "evt-churrasco-massa", 3),
  eventInvite("notification-event-rodeio", "evt-rodeio-campinas", 3),
  eventInvite("notification-event-after", "evt-after-madrugada", 14),
  eventInvite("notification-event-encontro", "evt-encontro-sulsp", 14),
];

const mockNotifications: Notification[] = [...friendRequests, ...eventInvites];

export function getMockNotifications(): Notification[] {
  return mockNotifications;
}

export function respondToMockFriendRequest(
  id: string,
  response: FriendRequestResponse,
): FriendRequestNotification | null {
  const request = mockNotifications.find(
    (item): item is FriendRequestNotification =>
      item.kind === "friend-request" && item.id === id && item.status === "pending",
  );
  if (!request) return null;

  request.status = response;
  return request;
}
