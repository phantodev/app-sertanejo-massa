import { ChevronDown } from "lucide-react";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { CurrentUser } from "../../session/types/session.types.ts";

type AccountMenuProps = {
  user: CurrentUser;
  compact?: boolean;
};

export function AccountMenu({ user, compact = false }: AccountMenuProps) {
  return (
    <button
      type="button"
      className={`flex min-h-11 items-center gap-3 rounded-full px-3.5 py-3 text-left transition-colors hover:bg-white/5 ${
        compact ? "mx-auto size-11 justify-center p-0" : "w-full"
      }`}
      aria-label={`Conta de ${user.displayName}`}
    >
      <UserAvatar name={user.displayName} size="sm" src={user.avatarUrl} />
      {!compact ? (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-massa-text">
              {user.displayName}
            </span>
            <span className="block truncate text-xs text-massa-muted">{user.accountLabel}</span>
          </span>
          <ChevronDown aria-hidden className="size-4 shrink-0 text-massa-muted" />
        </>
      ) : null}
    </button>
  );
}
