import type { User } from "../../session/types/session.types.ts";
import type { EventSummary } from "../../events/types/events.types.ts";

export type NotificationActor = Pick<
  User,
  "id" | "handle" | "displayName" | "avatarUrl" | "verified" | "city" | "state"
>;

export type FriendRequestStatus = "pending" | "accepted" | "declined";

export type FriendRequestNotification = {
  id: string;
  kind: "friend-request";
  actor: NotificationActor;
  createdAt: string;
  status: FriendRequestStatus;
};

export type EventInviteNotification = {
  id: string;
  kind: "event-invite";
  actor: NotificationActor;
  event: Pick<EventSummary, "id" | "slug" | "title" | "coverUrl">;
  createdAt: string;
};

export type Notification = FriendRequestNotification | EventInviteNotification;

export type NotificationSection = {
  id: "friend-requests" | "last-7-days" | "last-30-days";
  title: string;
  notifications: Notification[];
};

export type FriendRequestResponse = "accepted" | "declined";
