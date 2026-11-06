import { Plus } from "lucide-react";
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
      <span className="relative aspect-square w-[86%] shrink-0 overflow-visible rounded-full bg-fm-purple p-[3px]">
        <span className="block size-full overflow-hidden rounded-full bg-fm-yellow-light p-[3px]">
          <img
            src={story.avatarUrl}
            alt={story.label}
            className="size-full rounded-full object-cover"
            loading="lazy"
          />
        </span>
        {story.isOwn ? (
          <span className="absolute bottom-0.5 right-0.5 z-10 grid size-7 place-items-center rounded-full border-2 border-fm-yellow-light bg-fm-purple text-white">
            <Plus className="size-3.5" strokeWidth={3} />
          </span>
        ) : null}
      </span>
      <span className="w-full truncate text-center text-xs font-semibold text-massa-muted">
        {story.label}
      </span>
    </a>
  );
}
