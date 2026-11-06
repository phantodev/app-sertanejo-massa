import { Button } from "@heroui/react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
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
      className={`relative overflow-hidden rounded-xl border border-fm-purple/25 bg-fm-yellow transition-all hover:border-fm-purple/50 ${
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

      <Link
        to={`/${user.handle}`}
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
            {user.verified ? <VerifiedBadge size="md" /> : null}
          </div>
          <p className="truncate text-[11px] text-massa-muted">
            {locationLabel(user.city, user.state)}
          </p>
        </div>
      </Link>
      <div className="relative px-3 pb-3">
        <Button size="sm" fullWidth className="btn-fm-blue bg-fm-blue text-white">
          Ver perfil
        </Button>
        <Link
          to={`/${user.handle}`}
          className="absolute inset-0"
          aria-label={`Ver perfil de ${user.displayName}`}
        />
      </div>
    </div>
  );
}
