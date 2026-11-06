/** Paths da app que não devem ser tratados como handle de perfil. */
export const RESERVED_HANDLES = new Set([
  "feed",
  "create",
  "shorts",
  "messages",
  "notifications",
  "radar",
  "latest",
  "events",
  "ranking",
  "bookmarks",
  "settings",
  "survey",
  "login",
  "signup",
  "search",
]);

export function isReservedHandle(handle: string | undefined): boolean {
  if (!handle) return true;
  return RESERVED_HANDLES.has(handle.toLowerCase());
}
