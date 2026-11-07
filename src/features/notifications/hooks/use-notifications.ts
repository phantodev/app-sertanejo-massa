import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  respondToFriendRequest,
  getNotificationSections,
} from "../services/notifications.service.ts";
import type { FriendRequestResponse } from "../types/notifications.types.ts";
import { notificationsKeys } from "./notifications.keys.ts";

export function useNotificationSections() {
  return useQuery({
    queryKey: notificationsKeys.sections(),
    queryFn: getNotificationSections,
  });
}

export function useRespondToFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, response }: { id: string; response: FriendRequestResponse }) =>
      respondToFriendRequest(id, response),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationsKeys.all }),
  });
}
