import { ScrollShadow } from "@heroui/react";
import type { Suggestion } from "../types/suggestions.types.ts";
import { SuggestionCard } from "./SuggestionCard.tsx";

type SuggestionsCarouselProps = {
  suggestions: Suggestion[];
};

export function SuggestionsCarousel({ suggestions }: SuggestionsCarouselProps) {
  return (
    <section className="pt-4">
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="text-base font-semibold text-massa-text">Sugestões para você</h2>
        <a href="/suggestions" className="text-sm font-medium text-massa-gold">
          Ver tudo
        </a>
      </div>
      <ScrollShadow
        orientation="horizontal"
        className="border-b border-massa-border pb-0 [&>div]:overflow-x-auto"
      >
        <div className="flex gap-3 px-4 pb-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} compact suggestion={suggestion} />
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}
