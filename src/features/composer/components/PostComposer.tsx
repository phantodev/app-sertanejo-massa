import { Button, TextArea } from "@heroui/react";
import { Image, MapPin, Mic, Video } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { CurrentUser } from "../../session/types/session.types.ts";
import type { ComposerAction } from "../types/composer.types.ts";

const ACTION_ICONS = {
  photos: Image,
  video: Video,
  location: MapPin,
  audio: Mic,
} as const;

type PostComposerProps = {
  user: CurrentUser;
  actions: ComposerAction[];
};

export function PostComposer({ user, actions }: PostComposerProps) {
  const [text, setText] = useState("");
  const canPublish = text.trim().length > 0;

  return (
    <section className="flex gap-3 border-b border-massa-border px-4 py-3">
      <UserAvatar name={user.displayName} size="md" src={user.avatarUrl} />
      <div className="min-w-0 flex-1">
        <TextArea
          aria-label="Texto da publicação"
          className="composer-textarea min-h-10 w-full resize-none font-semibold placeholder:font-semibold"
          placeholder={`O que está acontecendo, ${user.displayName}?`}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {actions.map((action) => {
              const Icon = ACTION_ICONS[action.id];
              return (
                <button
                  key={action.id}
                  type="button"
                  aria-label={action.label}
                  className="grid size-9 place-items-center rounded-full text-fm-purple transition-colors hover:bg-fm-purple/10"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </button>
              );
            })}
          </div>
          <Button size="sm" isDisabled={!canPublish}>
            Publicar
          </Button>
        </div>
      </div>
    </section>
  );
}
