import { Flame, MessageCircle } from "lucide-react";
import { UserAvatar } from "../../../shared/ui/UserAvatar.tsx";
import type { FeedPost } from "../types/feed.types.ts";

type WelcomePostCardProps = {
  post: FeedPost;
};

export function WelcomePostCard({ post }: WelcomePostCardProps) {
  const name = post.author.displayName;

  return (
    <div
      className="mt-3 overflow-hidden rounded-xl border border-fm-purple/25 bg-fm-purple px-5 py-8 text-center"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, var(--fm-yellow) 35%, transparent) 0%, transparent 70%),
          radial-gradient(circle, color-mix(in srgb, var(--fm-yellow) 18%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "auto, 14px 14px",
      }}
    >
      <div className="relative mx-auto w-fit">
        <div className="rounded-full p-[3px] ring-2 ring-fm-yellow/70">
          <UserAvatar name={name} size="lg" src={post.author.avatarUrl} />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 grid size-7 place-items-center rounded-full border-2 border-fm-purple bg-fm-yellow-light text-[#1a100b] shadow-sm">
          <Flame aria-hidden className="size-3.5 fill-current" />
        </span>
      </div>

      <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-tight text-white">
        Boas-vindas, <em className="text-fm-yellow">{name}</em>
      </h3>
      <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-white/75">
        {post.body}
      </p>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-fm-yellow bg-fm-yellow-light px-5 py-2.5 text-sm font-semibold text-fm-purple transition-colors hover:bg-fm-yellow-light"
      >
        <MessageCircle className="size-4" strokeWidth={1.75} />
        {post.ctaLabel ?? "Dizer oi"}
      </button>
    </div>
  );
}
