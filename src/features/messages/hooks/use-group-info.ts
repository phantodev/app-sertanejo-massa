import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExploreGroups, getGroupInfo, joinExploreGroup } from "../services/messages.service.ts";
import { messagesKeys } from "./messages.keys.ts";

export function useGroupInfo(conversationId: string | undefined) {
  return useQuery({
    queryKey: messagesKeys.groupInfo(conversationId ?? ""),
    queryFn: () => getGroupInfo(conversationId!),
    enabled: Boolean(conversationId),
  });
}

export function useExploreGroups(query: string) {
  return useQuery({
    queryKey: messagesKeys.explore(query),
    queryFn: () => getExploreGroups(query),
  });
}

export function useJoinExploreGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exploreId: string) => joinExploreGroup(exploreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesKeys.all });
    },
  });
}
