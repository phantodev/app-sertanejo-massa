import { Image as ImageIcon } from "lucide-react";
import type { MessageReplyPreview } from "../types/messages.types.ts";

type MessageReplyCardProps = {
  reply: MessageReplyPreview;
  mine?: boolean;
  className?: string;
};

export function MessageReplyCard({ reply, mine = false, className = "" }: MessageReplyCardProps) {
  const authorClass = mine ? "text-massa-gold" : "text-white";
  const previewClass = mine ? "text-white/70" : "text-white/80";

  return (
    <div
      className={`flex min-h-[68px] min-w-0 overflow-hidden rounded-lg border-l-[3px] border-fm-purple-light ${
        mine ? "bg-black/25" : "bg-fm-purple-dark"
      } ${className}`}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center px-2.5 py-2">
        <p className={`truncate text-[11px] font-semibold ${authorClass}`}>{reply.authorName}</p>
        <div className={`mt-0.5 flex min-w-0 items-center gap-1.5 ${previewClass}`}>
          {reply.kind === "image" ? (
            <ImageIcon aria-hidden="true" className="size-4 shrink-0" />
          ) : null}
          <p className="truncate text-[12px] font-semibold">
            {reply.kind === "image" ? "Foto" : reply.body}
          </p>
        </div>
      </div>
      {reply.kind === "image" && reply.mediaUrl ? (
        <img
          src={reply.mediaUrl}
          alt=""
          className="h-[68px] w-[76px] shrink-0 object-cover"
          loading="lazy"
        />
      ) : null}
    </div>
  );
}
