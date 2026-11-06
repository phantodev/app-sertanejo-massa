import { CalendarDays, MapPin } from "lucide-react";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import type { UserProfile } from "../types/profile.types.ts";

type ProfileAboutProps = {
  profile: UserProfile;
};

function formatJoined(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function ProfileAbout({ profile }: ProfileAboutProps) {
  const { user } = profile;

  return (
    <div className="space-y-5 px-4 py-5">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-massa-gold/80">
          Sobre
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-massa-text/90">{profile.bio}</p>
      </section>

      <ul className="space-y-3 border-t border-massa-border pt-4 text-sm text-massa-muted">
        <li className="flex items-center gap-2.5">
          <MapPin className="size-4 shrink-0 text-massa-gold" />
          <span>{locationLabel(user.city, user.state)}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <CalendarDays className="size-4 shrink-0 text-massa-gold" />
          <span>Na Massa desde {formatJoined(profile.joinedAt)}</span>
        </li>
      </ul>

      <div className="overflow-hidden rounded-2xl border border-massa-border bg-gradient-to-br from-[#2a2118] via-[#1b1714] to-[#12100e] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-massa-gold/80">
          Na comunidade
        </p>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="text-[11px] text-massa-muted">Publicações</dt>
            <dd className="mt-1 text-lg font-semibold text-massa-text">{profile.stats.posts}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-massa-muted">Amigos</dt>
            <dd className="mt-1 text-lg font-semibold text-massa-text">{profile.stats.friends}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-massa-muted">Mídia</dt>
            <dd className="mt-1 text-lg font-semibold text-massa-text">{profile.stats.media}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
