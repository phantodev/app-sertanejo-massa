import { BadgeCheck, MapPin } from "lucide-react";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { UserProfile } from "../types/profile.types.ts";
import { ProfileActions } from "./ProfileActions.tsx";

type ProfileHeaderProps = {
  profile: UserProfile;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { user, stats } = profile;

  return (
    <section className="border-b border-massa-border">
      <div className="relative">
        <div className="relative h-[148px] overflow-hidden sm:h-[188px]">
          <img src={profile.coverUrl} alt="" className="size-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-[#0e0c0b]/55 to-[#0e0c0b]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(233,179,111,0.22),_transparent_55%)]" />
        </div>

        <div className="relative px-4 pb-4">
          <div className="-mt-12 flex items-end justify-between gap-3 sm:-mt-14">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-massa-gold via-[#a87945] to-transparent opacity-90 blur-[1px]" />
              <UserAvatar
                name={user.displayName}
                size="lg"
                src={user.avatarUrl}
                className="relative size-24 ring-4 ring-massa-bg sm:size-28"
              />
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-massa-text sm:text-2xl">
                  {user.displayName}
                </h1>
                {user.verified ? (
                  <BadgeCheck
                    aria-label="Conta verificada"
                    className="size-5 shrink-0 fill-massa-gold text-accent-foreground"
                  />
                ) : null}
              </div>
              <p className="mt-0.5 text-sm text-massa-muted">@{user.handle}</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-massa-muted">
                <MapPin className="size-3.5 shrink-0 text-massa-gold/80" />
                {locationLabel(user.city, user.state)}
              </p>
            </div>

            <p className="text-[15px] leading-relaxed text-massa-text/90">{profile.bio}</p>

            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <div className="flex items-baseline gap-1.5">
                <dt className="font-semibold text-massa-text">{formatCount(stats.posts)}</dt>
                <dd className="text-massa-muted">publicações</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="font-semibold text-massa-text">{formatCount(stats.friends)}</dt>
                <dd className="text-massa-muted">amigos</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="font-semibold text-massa-text">{formatCount(stats.media)}</dt>
                <dd className="text-massa-muted">fotos e vídeos</dd>
              </div>
            </dl>

            <ProfileActions status={profile.friendshipStatus} displayName={user.displayName} />
          </div>
        </div>
      </div>
    </section>
  );
}
