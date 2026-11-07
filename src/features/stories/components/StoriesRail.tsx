import { ScrollShadow } from "@heroui/react";
import type { StoryItem } from "../types/stories.types.ts";
import { StoryItemCard } from "./StoryItem.tsx";

type StoriesRailProps = {
  stories: StoryItem[];
};

export function StoriesRail({ stories }: StoriesRailProps) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="border-b border-massa-border bg-fm-yellow-bright pt-4 pb-0 [&>div]:overflow-x-auto [&>div]:overflow-y-visible"
    >
      {/* Respiro interno preserva os avatares nas bordas e afasta os nomes do divisor. */}
      <div className="flex gap-3.5 px-4 pt-1 pb-4">
        {stories.map((story) => (
          <StoryItemCard key={story.id} story={story} />
        ))}
      </div>
    </ScrollShadow>
  );
}
