import { useQuery } from "@tanstack/react-query";
import { getFanPageByHandle } from "../services/fan-page.service.ts";
import { fanPageKeys } from "./fan-page.keys.ts";

export function useFanPage(handle: string | undefined) {
  return useQuery({
    queryKey: fanPageKeys.byHandle(handle ?? ""),
    queryFn: () => getFanPageByHandle(handle!),
    enabled: Boolean(handle),
    staleTime: 60_000,
  });
}
