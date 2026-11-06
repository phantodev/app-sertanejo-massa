import { mockUsers } from "../../session/services/session.mock.ts";
import type { StoryItem } from "../types/stories.types.ts";

const byHandle = (handle: string) => mockUsers.find((user) => user.handle === handle)!;

export const mockStories: StoryItem[] = [
  {
    id: "story-own",
    userId: byHandle("gold").id,
    label: "Meu story",
    avatarUrl: byHandle("gold").avatarUrl,
    hasUnseen: false,
    isOwn: true,
  },
  {
    id: "story-jemhot",
    userId: byHandle("jemhot").id,
    label: byHandle("jemhot").displayName,
    avatarUrl: byHandle("jemhot").avatarUrl,
    hasUnseen: true,
    isOwn: false,
  },
  {
    id: "story-hotbar",
    userId: byHandle("hotbar").id,
    label: byHandle("hotbar").displayName,
    avatarUrl: byHandle("hotbar").avatarUrl,
    hasUnseen: true,
    isOwn: false,
  },
  {
    id: "story-admin",
    userId: byHandle("admin").id,
    label: byHandle("admin").displayName,
    avatarUrl: byHandle("admin").avatarUrl,
    hasUnseen: true,
    isOwn: false,
  },
  {
    id: "story-namu",
    userId: byHandle("namu").id,
    label: byHandle("namu").displayName,
    avatarUrl: byHandle("namu").avatarUrl,
    hasUnseen: false,
    isOwn: false,
  },
];
