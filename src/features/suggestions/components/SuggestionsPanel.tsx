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
        <SearchField.Group className="h-12 w-full rounded-xl border border-solid border-fm-purple/25 bg-fm-yellow-bright shadow-none">
          <SearchField.SearchIcon className="text-fm-purple" />
          <SearchField.Input
            placeholder="Pesquisar"
            className="text-[15px] font-semibold text-fm-purple placeholder:font-semibold placeholder:text-fm-purple"
          />
        </SearchField.Group>
      </SearchField>

      <section aria-label="Sugestões de amizade" className="rounded-2xl bg-fm-yellow-light p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-massa-text">Sugestões para você</h2>
          <a
            href="/suggestions"
            className="text-sm font-bold text-fm-purple hover:text-fm-purple-dark"
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
