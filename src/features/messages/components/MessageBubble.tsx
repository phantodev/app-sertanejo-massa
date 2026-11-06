import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { formatMessageTime } from "../lib/format-chat-time.ts";
import type { ChatMessage } from "../types/messages.types.ts";

type MessageBubbleProps = {
  message: ChatMessage;
  showAuthor: boolean;
};

export function MessageBubble({ message, showAuthor }: MessageBubbleProps) {
  if (message.kind === "system") {
    return (
      <div className="flex justify-center px-4 py-2">
        <p className="rounded-full bg-[#1b1714]/90 px-3 py-1 text-center text-[11px] text-massa-muted">
          {message.body}
        </p>
      </div>
    );
  }

  const bubbleClass = message.mine
    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-[#3a2a1c] to-[#241910] text-massa-text"
    : "rounded-2xl rounded-bl-md border border-massa-border bg-[#181411] text-massa-text";

  return (
    <div className={`flex gap-2 px-3 py-0.5 ${message.mine ? "justify-end" : "justify-start"}`}>
      {!message.mine && showAuthor ? (
        <Link
          to={message.authorHandle ? `/${message.authorHandle}` : "#"}
          className="mt-5 shrink-0"
        >
          <img src={message.authorAvatarUrl} alt="" className="size-8 rounded-full object-cover" />
        </Link>
      ) : !message.mine ? (
        <span className="size-8 shrink-0" />
      ) : null}

      <div className={`max-w-[min(78%,420px)] ${bubbleClass}`}>
        {!message.mine && showAuthor && message.authorName ? (
          <Link
            to={message.authorHandle ? `/${message.authorHandle}` : "#"}
            className="block px-3 pt-2 text-[12px] font-semibold text-massa-gold hover:underline"
          >
            {message.authorName}
          </Link>
        ) : null}

        {message.replyTo ? (
          <div className="mx-2 mt-2 rounded-lg border-l-2 border-massa-gold/70 bg-black/25 px-2.5 py-1.5">
            <p className="text-[11px] font-semibold text-massa-gold">
              {message.replyTo.authorName}
            </p>
            <p className="truncate text-[12px] text-massa-muted">{message.replyTo.body}</p>
          </div>
        ) : null}

        {message.kind === "image" && message.mediaUrl ? (
          <div className="p-1.5">
            <img
              src={message.mediaUrl}
              alt={message.body ?? ""}
              className="max-h-72 w-full rounded-xl object-cover"
              loading="lazy"
            />
            {message.body ? (
              <p className="px-1.5 pt-1.5 pb-0.5 text-[14px] leading-snug">{message.body}</p>
            ) : null}
          </div>
        ) : null}

        {message.kind === "audio" ? (
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-massa-gold/20 text-massa-gold">
              <Play className="size-3.5 fill-current" />
            </span>
            <span className="h-1 flex-1 rounded-full bg-massa-gold/25">
              <span className="block h-full w-1/3 rounded-full bg-massa-gold" />
            </span>
            <span className="text-[11px] text-massa-muted">
              0:{String(message.audioDurationSec ?? 0).padStart(2, "0")}
            </span>
          </div>
        ) : null}

        {message.kind === "text" ? (
          <p className="whitespace-pre-wrap px-3 pt-2 pb-1 text-[14px] leading-snug">
            {message.body}
          </p>
        ) : null}

        <div className="flex items-end justify-end gap-2 px-2.5 pb-1.5">
          {message.reactions?.length ? (
            <div className="mr-auto flex gap-1">
              {message.reactions.map((reaction) => (
                <span
                  key={reaction.emoji}
                  className="rounded-full border border-massa-border bg-[#0e0c0b]/70 px-1.5 py-0.5 text-[11px]"
                >
                  {reaction.emoji} {reaction.count}
                </span>
              ))}
            </div>
          ) : null}
          <span className="text-[10px] text-massa-muted">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
