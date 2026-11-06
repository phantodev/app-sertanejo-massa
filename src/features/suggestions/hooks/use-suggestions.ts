import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/suggestions.service.ts";
import { suggestionsKeys } from "./suggestions.keys.ts";

export function useSuggestions() {
  return useQuery({
    queryKey: suggestionsKeys.list(),
    queryFn: getSuggestions,
  });
}
