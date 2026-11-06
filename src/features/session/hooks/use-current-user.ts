import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/session.service.ts";
import { sessionKeys } from "./session.keys.ts";

export function useCurrentUser() {
  return useQuery({
    queryKey: sessionKeys.currentUser(),
    queryFn: getCurrentUser,
  });
}
