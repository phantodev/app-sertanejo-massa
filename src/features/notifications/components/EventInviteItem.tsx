import { Link } from "react-router-dom";
import { formatEventNotificationDate } from "../lib/format-notification-date.ts";
import type { EventInviteNotification } from "../types/notifications.types.ts";
import { NotificationAvatar } from "./NotificationAvatar.tsx";

type EventInviteItemProps = {
  notification: EventInviteNotification;
};

export function EventInviteItem({ notification }: EventInviteItemProps) {
  const { actor, event } = notification;

  return (
    <li>
      <Link
        to={`/events/${event.slug}`}
        className="flex min-w-0 items-center gap-3 px-3 py-3.5 transition-colors hover:bg-fm-yellow/20 sm:px-4"
      >
        <NotificationAvatar actor={actor} />
        <p className="min-w-0 flex-1 break-words text-[14px] font-semibold leading-snug text-massa-text">
          <span className="text-fm-blue">{actor.displayName}</span> convidou você para o evento{" "}
          <span className="text-massa-text">{event.title}</span>{" "}
          <time
            className="whitespace-nowrap font-medium text-massa-muted"
            dateTime={notification.createdAt}
          >
            {formatEventNotificationDate(notification.createdAt)}
          </time>
        </p>
        <img
          src={event.coverUrl}
          alt=""
          className="size-12 shrink-0 rounded-lg object-cover"
          loading="lazy"
        />
      </Link>
    </li>
  );
}
