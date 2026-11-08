/** Handles reservados a Fan Pages oficiais (não são perfis pessoais). */
export const FAN_PAGE_HANDLES = new Set(["alagoanos-oficial"]);

export function isFanPageHandle(handle: string | undefined): boolean {
  if (!handle) return false;
  return FAN_PAGE_HANDLES.has(handle.toLowerCase());
}
