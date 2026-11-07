import type { NotificationActor } from "../types/notifications.types.ts";

type NotificationAvatarProps = {
  actor: NotificationActor;
};

export function NotificationAvatar({ actor }: NotificationAvatarProps) {
  return (
    <span className="mt-0.5 block size-11 shrink-0">
      <img
        src={actor.avatarUrl}
        alt=""
        className="size-11 rounded-full object-cover"
        loading="lazy"
      />
    </span>
  );
}
