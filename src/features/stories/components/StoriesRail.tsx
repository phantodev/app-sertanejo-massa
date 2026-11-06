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
      className="border-b border-massa-border px-4 py-4 [&>div]:overflow-x-auto [&>div]:overflow-y-visible"
    >
      {/* py extra evita o ScrollShadow cortar a borda roxa do 1º/último */}
      <div className="flex gap-3.5 py-1">
        {stories.map((story) => (
          <StoryItemCard key={story.id} story={story} />
        ))}
      </div>
    </ScrollShadow>
  );
}
