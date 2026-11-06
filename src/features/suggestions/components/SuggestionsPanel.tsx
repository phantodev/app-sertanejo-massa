import { SearchField } from "@heroui/react";
import type { Suggestion } from "../types/suggestions.types.ts";
import { SuggestionCard } from "./SuggestionCard.tsx";

type SuggestionsPanelProps = {
  suggestions: Suggestion[];
};

export function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  return (
    <div className="flex flex-col gap-4 px-1 py-1">
      <SearchField aria-label="Pesquisar" className="w-full">
        <SearchField.Group className="h-[45px] w-full rounded-[7px] border border-solid border-[#44372d] bg-[#120f0d] shadow-none">
          <SearchField.SearchIcon className="text-[#948477]" />
          <SearchField.Input
            placeholder="Pesquisar"
            className="text-[11px] text-[#f7e7da] placeholder:text-[#6c6159]"
          />
        </SearchField.Group>
      </SearchField>

      <section
        aria-label="Sugestões de amizade"
        className="rounded-2xl border border-[#3a302a] bg-[#181411] p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-massa-text">Sugestões para você</h2>
          <a
            href="/suggestions"
            className="text-sm font-bold text-massa-gold hover:text-massa-gold-light"
          >
            Ver tudo
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {suggestions.slice(0, 4).map((suggestion) => (
            <li key={suggestion.id}>
              <SuggestionCard suggestion={suggestion} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
