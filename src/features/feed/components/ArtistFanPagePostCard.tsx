import { CalendarDays, Mic2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { FeedPost } from "../types/feed.types.ts";

const FAN_PAGE_PATTERN = {
  backgroundImage: `
    radial-gradient(ellipse 85% 60% at 50% 0%, color-mix(in srgb, var(--fm-yellow) 32%, transparent) 0%, transparent 72%),
    radial-gradient(circle, color-mix(in srgb, var(--fm-yellow) 16%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: "auto, 14px 14px",
} as const;

type ArtistFanPagePostCardProps = {
  post: FeedPost;
};

export function ArtistFanPagePostCard({ post }: ArtistFanPagePostCardProps) {
  const fanPage = post.fanPage;
  if (!fanPage) return null;

  const personalName = post.author.displayName;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-fm-purple/25 shadow-[0_12px_40px_-20px_rgba(75,0,130,0.45)]">
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-fm-purple">
          {post.coverUrl ? (
            <img src={post.coverUrl} alt="" className="size-full object-cover" loading="lazy" />
          ) : (
            <div className="size-full bg-gradient-to-br from-fm-purple to-[#2a1545]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-fm-purple via-fm-purple/35 to-transparent" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-fm-blue px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            <Sparkles className="size-3" aria-hidden />
            Nova Fan Page
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
          <div className="pointer-events-auto relative">
            <div className="rounded-full bg-fm-purple p-1.5 ring-[3px] ring-fm-yellow/85">
              <div className="size-24 overflow-hidden rounded-full bg-fm-purple">
                <img
                  src={post.author.avatarUrl}
                  alt={fanPage.displayName}
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 grid size-10 place-items-center rounded-full border-2 border-fm-purple bg-fm-yellow-light text-fm-purple shadow-md">
              <Mic2 className="size-5" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      <div className="relative bg-fm-purple px-5 pb-6 pt-16" style={FAN_PAGE_PATTERN}>
        <div className="text-center">
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-fm-yellow">
            Fan Page de artista
          </p>
          <h3 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-white">
            {fanPage.displayName}
          </h3>
          <span className="mt-2 inline-flex rounded-full bg-fm-blue px-3 py-1 text-xs font-semibold text-white">
            @{fanPage.handle}
          </span>

          <p className="massa-description mx-auto mt-3 max-w-[min(100%,440px)] text-white/80">
            {post.body}
          </p>

          <ul className="mx-auto mt-4 flex max-w-[340px] flex-wrap items-center justify-center gap-2">
            <li className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
              <Mic2 className="size-3 text-fm-yellow" aria-hidden />
              Lançamentos
            </li>
            <li className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
              <CalendarDays className="size-3 text-fm-yellow" aria-hidden />
              Agenda de shows
            </li>
            <li className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
              <Sparkles className="size-3 text-fm-yellow" aria-hidden />
              Bastidores
            </li>
          </ul>

          <p className="massa-description mx-auto mt-4 max-w-[min(100%,440px)] text-white/65">
            <span className="font-semibold text-white/85">{personalName}</span> continua com perfil
            pessoal — a Fan Page é o canal oficial pra fãs e novidades.
          </p>

          <div className="mt-5 flex justify-center">
            <Link
              to={`/${fanPage.handle}`}
              className="inline-flex items-center justify-center rounded-full border border-fm-yellow bg-fm-yellow-light px-5 py-2.5 text-xs font-bold text-fm-purple transition-colors hover:bg-fm-yellow"
            >
              {post.ctaLabel ?? "Seguir Fan Page"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
