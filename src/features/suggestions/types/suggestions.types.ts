import type { User } from "../../session/types/session.types.ts";

export type Suggestion = {
  id: string;
  user: Pick<User, "id" | "handle" | "displayName" | "avatarUrl" | "verified" | "city" | "state">;
};
