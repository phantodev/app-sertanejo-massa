import { Plus } from "lucide-react";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { StoryItem as StoryItemType } from "../types/stories.types.ts";

type StoryItemProps = {
  story: StoryItemType;
};

/** Tamanho fixo (~mobile); no desktop só cabem mais no rail. */
const STORY_WIDTH = "w-[96px]";

export function StoryItemCard({ story }: StoryItemProps) {
  return (
    <a
      href={story.isOwn ? "/stories/create" : `/stories/${story.userId}`}
      className={`flex ${STORY_WIDTH} shrink-0 flex-col items-center gap-2`}
    >
      <span
        className={`relative aspect-square w-[86%] rounded-full p-[3px] ${
          story.hasUnseen
            ? "bg-gradient-to-br from-massa-gold via-massa-gold-light to-massa-gold-dark"
            : "bg-massa-border"
        }`}
      >
        <span className="block size-full rounded-full bg-massa-bg p-[3px]">
          <UserAvatar
            name={story.label}
            size="lg"
            src={story.avatarUrl}
            className="size-full! max-h-none! max-w-none! [&_img]:size-full"
          />
        </span>
        {story.isOwn ? (
          <span className="absolute bottom-0.5 right-0.5 grid size-7 place-items-center rounded-full border-2 border-massa-bg bg-massa-gold text-accent-foreground">
            <Plus className="size-3.5" strokeWidth={3} />
          </span>
        ) : null}
      </span>
      <span className="w-full truncate text-center text-xs text-massa-muted">{story.label}</span>
    </a>
  );
}
