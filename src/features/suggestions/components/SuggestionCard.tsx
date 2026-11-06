import { Button } from "@heroui/react";
import { BadgeCheck, X } from "lucide-react";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import type { Suggestion } from "../types/suggestions.types.ts";

type SuggestionCardProps = {
  suggestion: Suggestion;
  onDismiss?: (id: string) => void;
  compact?: boolean;
};

export function SuggestionCard({ suggestion, onDismiss, compact = false }: SuggestionCardProps) {
  const { user } = suggestion;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[#3a302a] bg-[#181411] transition-all hover:border-[#99774f] ${
        compact ? "w-[160px] shrink-0" : ""
      }`}
    >
      {onDismiss ? (
        <button
          type="button"
          aria-label={`Descartar sugestão de ${user.displayName}`}
          onClick={() => onDismiss(suggestion.id)}
          className="absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full bg-black/45 text-massa-text backdrop-blur-sm hover:bg-black/65"
        >
          <X className="size-3.5" />
        </button>
      ) : null}

      <a
        href={`/${user.handle}`}
        className="block"
        aria-label={`Ver perfil de ${user.displayName}`}
      >
        <div className="aspect-square overflow-hidden bg-[#302117]">
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="size-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1 p-3">
          <div className="flex items-center gap-1">
            <p className="truncate text-sm font-semibold text-massa-text">{user.displayName}</p>
            {user.verified ? (
              <BadgeCheck className="size-3.5 shrink-0 fill-massa-gold text-accent-foreground" />
            ) : null}
          </div>
          <p className="truncate text-[11px] text-massa-muted">
            {locationLabel(user.city, user.state)}
          </p>
        </div>
      </a>
      <div className="px-3 pb-3">
        <Button size="sm" fullWidth variant="secondary">
          Ver perfil
        </Button>
      </div>
    </div>
  );
}
