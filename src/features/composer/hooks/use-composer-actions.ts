import { useQuery } from "@tanstack/react-query";
import { getComposerActions } from "../services/composer.service.ts";
import { composerKeys } from "./composer.keys.ts";

export function useComposerActions() {
  return useQuery({
    queryKey: composerKeys.actions(),
    queryFn: getComposerActions,
  });
}
