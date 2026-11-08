import { Link2, MapPin, Mic2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import type { FanPageProfile } from "../types/fan-page.types.ts";
import { FanPageActions } from "./FanPageActions.tsx";

type FanPageHeaderProps = {
  page: FanPageProfile;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: value >= 10_000 ? "compact" : "standard",
  }).format(value);
}

export function FanPageHeader({ page }: FanPageHeaderProps) {
  return (
    <section className="border-b border-massa-border">
      <div className="relative">
        <div className="relative h-[148px] overflow-hidden sm:h-[200px]">
          <img src={page.coverUrl} alt="" className="size-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-[#0e0c0b]/50 to-black/20" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-fm-blue px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            <Sparkles className="size-3" aria-hidden />
            Fan Page
          </span>
        </div>

        <div className="relative px-4 pb-4">
          <div className="-mt-14 flex items-end justify-between gap-3 sm:-mt-16">
            <div className="rounded-full bg-massa-bg p-1 ring-4 ring-massa-bg">
              <div className="size-24 overflow-hidden rounded-full bg-fm-purple sm:size-28">
                <img
                  src={page.avatarUrl}
                  alt={page.displayName}
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <span className="mb-1 inline-flex items-center gap-1 rounded-full border border-fm-purple/25 bg-fm-yellow-light px-2.5 py-1 text-[11px] font-semibold text-fm-purple">
              <Mic2 className="size-3.5 text-fm-blue" aria-hidden />
              {page.category}
            </span>
          </div>

          <div className="mt-3 space-y-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-massa-text sm:text-2xl">
                  {page.displayName}
                </h1>
                {page.verified ? <VerifiedBadge size="lg" /> : null}
              </div>
              <p className="mt-1 inline-flex rounded-full bg-fm-blue px-2.5 py-0.5 text-xs font-semibold text-white">
                @{page.handle}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-massa-muted">
                <MapPin className="size-3.5 shrink-0 text-fm-blue" />
                {locationLabel(page.city, page.state)}
              </p>
            </div>

            <p className="massa-description text-massa-text/90">{page.shortBio}</p>

            <ul className="flex flex-wrap gap-2">
              {page.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-fm-purple/20 bg-fm-yellow-light px-2.5 py-1 text-[11px] font-semibold text-fm-purple"
                >
                  {item}
                </li>
              ))}
            </ul>

            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <div className="flex items-baseline gap-1.5">
                <dt className="font-bold text-massa-text">{formatCount(page.followerCount)}</dt>
                <dd className="font-bold text-fm-blue">seguidores</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="font-bold text-massa-text">{formatCount(page.stats.posts)}</dt>
                <dd className="font-bold text-fm-blue">publicações</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="font-bold text-massa-text">{formatCount(page.stats.media)}</dt>
                <dd className="font-bold text-fm-blue">fotos e vídeos</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="font-bold text-massa-text">{formatCount(page.stats.events)}</dt>
                <dd className="font-bold text-fm-blue">eventos</dd>
              </div>
            </dl>

            <Link
              to={`/${page.personalHandle}`}
              className="massa-description inline-flex items-center gap-1.5 text-fm-blue hover:underline"
            >
              <Link2 className="size-3.5" aria-hidden />
              Perfil pessoal de {page.personalDisplayName}
            </Link>

            <FanPageActions displayName={page.displayName} initialFollowing={page.isFollowing} />
          </div>
        </div>
      </div>
    </section>
  );
}
