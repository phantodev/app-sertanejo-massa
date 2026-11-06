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
      className="mt-3 overflow-hidden rounded-xl border border-[#5a4635] px-5 py-8 text-center"
      style={{
        backgroundColor: "#1b1714",
        backgroundImage: `
          radial-gradient(ellipse 80% 55% at 50% 0%, #3a2a1c 0%, transparent 70%),
          radial-gradient(circle, #e9b36f22 1px, transparent 1px)
        `,
        backgroundSize: "auto, 14px 14px",
      }}
    >
      <div className="relative mx-auto w-fit">
        <div className="rounded-full p-[3px] ring-2 ring-massa-gold/45">
          <UserAvatar name={name} size="lg" src={post.author.avatarUrl} />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 grid size-7 place-items-center rounded-full border-2 border-[#1b1714] bg-massa-gold text-[#1a100b] shadow-sm">
          <Flame aria-hidden className="size-3.5 fill-current" />
        </span>
      </div>

      <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-tight text-[#f6f0e9]">
        Boas-vindas, <em className="text-massa-gold">{name}</em>
      </h3>
      <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-[#a9a19a]">
        {post.body}
      </p>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#99774f] bg-[#e9b36f14] px-5 py-2.5 text-sm font-semibold text-massa-gold transition-colors hover:border-massa-gold hover:bg-massa-gold/20"
      >
        <MessageCircle className="size-4" strokeWidth={1.75} />
        {post.ctaLabel ?? "Dizer oi"}
      </button>
    </div>
  );
}
