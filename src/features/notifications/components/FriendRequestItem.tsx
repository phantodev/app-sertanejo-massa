import { formatRequestDate } from "../lib/format-notification-date.ts";
import type {
  FriendRequestNotification,
  FriendRequestResponse,
} from "../types/notifications.types.ts";
import { NotificationAvatar } from "./NotificationAvatar.tsx";

type FriendRequestItemProps = {
  notification: FriendRequestNotification;
  isPending: boolean;
  onRespond: (id: string, response: FriendRequestResponse) => void;
};

export function FriendRequestItem({ notification, isPending, onRespond }: FriendRequestItemProps) {
  const { actor } = notification;

  return (
    <li className="flex min-w-0 items-start gap-3 px-3 py-3.5 sm:px-4">
      <NotificationAvatar actor={actor} />
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-snug text-massa-text">
          <span className="text-fm-blue">{actor.displayName}</span> solicitou amizade.{" "}
          <time className="font-medium text-massa-muted" dateTime={notification.createdAt}>
            {formatRequestDate(notification.createdAt)}
          </time>
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onRespond(notification.id, "accepted")}
            aria-label={`Aceitar solicitação de ${actor.displayName}`}
            className="inline-flex h-9 min-w-20 items-center justify-center rounded-full bg-fm-purple px-4 text-[13px] font-semibold text-white transition-colors hover:bg-fm-purple-dark disabled:cursor-wait disabled:opacity-60"
          >
            Aceitar
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => onRespond(notification.id, "declined")}
            aria-label={`Recusar solicitação de ${actor.displayName}`}
            className="inline-flex h-9 min-w-20 items-center justify-center rounded-full border border-massa-border bg-fm-yellow-light px-4 text-[13px] font-semibold text-fm-purple transition-colors hover:border-fm-purple hover:bg-fm-yellow disabled:cursor-wait disabled:opacity-60"
          >
            Recusar
          </button>
        </div>
      </div>
    </li>
  );
}
