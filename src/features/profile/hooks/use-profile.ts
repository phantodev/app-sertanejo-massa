import { useQuery } from "@tanstack/react-query";
import { getProfileByHandle } from "../services/profile.service.ts";
import { profileKeys } from "./profile.keys.ts";

export function useProfile(handle: string | undefined) {
  return useQuery({
    queryKey: profileKeys.byHandle(handle ?? ""),
    queryFn: () => getProfileByHandle(handle!),
    enabled: Boolean(handle),
  });
}
