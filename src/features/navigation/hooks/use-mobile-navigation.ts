import { useQuery } from "@tanstack/react-query";
import { getMobileNavigation } from "../services/navigation.service.ts";
import { navigationKeys } from "./navigation.keys.ts";

export function useMobileNavigation() {
  return useQuery({
    queryKey: navigationKeys.mobile(),
    queryFn: getMobileNavigation,
  });
}
