import { useQuery } from "@tanstack/react-query";
import { getSideNavigation } from "../services/navigation.service.ts";
import { navigationKeys } from "./navigation.keys.ts";

export function useSideNavigation() {
  return useQuery({
    queryKey: navigationKeys.side(),
    queryFn: getSideNavigation,
  });
}
