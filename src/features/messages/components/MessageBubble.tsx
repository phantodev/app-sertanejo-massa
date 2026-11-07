import { Dropdown, Label } from "@heroui/react";
import { EllipsisVertical, Pin, Play, Reply } from "lucide-react";
import { Link } from "react-router-dom";
import { formatMessageTime } from "../lib/format-chat-time.ts";
import { REACTION_EMOJIS, type ChatMessage } from "../types/messages.types.ts";
import { MessageReplyCard } from "./MessageReplyCard.tsx";

type MessageBubbleProps = {
  message: ChatMessage;
  showAuthor: boolean;
  onReply: (message: ChatMessage) => void;
  onReact: (messageId: string, emoji: string) => void;
  onPin: (messageId: string) => void;
};

function replyPreviewBody(message: ChatMessage) {
  if (message.kind === "audio") return "Áudio";
  if (message.kind === "image") return "Foto";
  return message.body ?? "";
}

export function MessageBubble({
  message,
  showAuthor,
  onReply,
  onReact,
  onPin,
}: MessageBubbleProps) {
  if (message.kind === "system") {
    return (
      <div className="flex justify-center px-4 py-2">
        <p className="rounded-full bg-fm-yellow-light/90 px-3 py-1 text-center text-[11px] text-massa-muted">
          {message.body}
        </p>
      </div>
    );
  }

  const bubbleClass = message.mine
    ? "rounded-2xl rounded-br-md bg-fm-purple text-white"
    : "rounded-2xl rounded-bl-md bg-fm-yellow text-massa-text";

  return (
    <div
      className={`group flex gap-2 px-3 py-0.5 ${message.mine ? "justify-end" : "justify-start"}`}
    >
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

      <div className="relative min-w-0 max-w-[min(78%,420px)]">
        <div className={bubbleClass}>
          {!message.mine && showAuthor && message.authorName ? (
            <Link
              to={message.authorHandle ? `/${message.authorHandle}` : "#"}
              className="block px-3 pt-2 text-[12px] font-semibold text-fm-purple hover:underline"
            >
              {message.authorName}
            </Link>
          ) : null}

          {message.pinned ? (
            <div className="flex items-center gap-1 px-3 pt-2 text-[10px] font-semibold text-massa-gold">
              <Pin className="size-2.5 fill-current" />
              Fixada
            </div>
          ) : null}

          {message.replyTo ? (
            <MessageReplyCard reply={message.replyTo} mine={message.mine} className="mx-2 mt-2" />
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
            <p className="break-words whitespace-pre-wrap px-3 pt-2 pb-1 text-[14px] font-semibold leading-snug">
              {message.body}
            </p>
          ) : null}

          <div className="flex items-end justify-end gap-2 px-2.5 pb-1.5">
            {message.reactions?.length ? (
              <div className="mr-auto flex flex-wrap gap-1">
                {message.reactions.map((reaction) => (
                  <button
                    key={reaction.emoji}
                    type="button"
                    onClick={() => onReact(message.id, reaction.emoji)}
                    className={`rounded-full border px-1.5 py-0.5 text-[11px] transition ${
                      reaction.reactedByMe
                        ? "border-massa-gold/50 bg-massa-gold/15 text-massa-text"
                        : "border-massa-border bg-fm-yellow-light/70 text-massa-text hover:border-massa-gold/40"
                    }`}
                  >
                    {reaction.emoji} {reaction.count}
                  </button>
                ))}
              </div>
            ) : null}
            <span className={`text-[10px] ${message.mine ? "text-white/70" : "text-massa-muted"}`}>
              {formatMessageTime(message.createdAt)}
            </span>
          </div>
        </div>

        <div
          className={`absolute top-1 z-10 flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100 max-lg:right-1 ${
            message.mine ? "lg:right-full lg:mr-1" : "lg:left-full lg:ml-1"
          }`}
        >
          <button
            type="button"
            aria-label="Responder"
            onClick={() => onReply(message)}
            className="grid size-7 place-items-center rounded-full bg-fm-yellow-light text-massa-gold shadow hover:bg-[#241e1a]"
          >
            <Reply className="size-3.5" />
          </button>
          <Dropdown>
            <button
              type="button"
              aria-label="Ações da mensagem"
              className="grid size-7 place-items-center rounded-full bg-fm-yellow-light text-massa-gold shadow hover:bg-[#241e1a]"
            >
              <EllipsisVertical className="size-3.5" />
            </button>
            <Dropdown.Popover className="min-w-44 border border-massa-border bg-fm-yellow-light">
              <Dropdown.Menu
                onAction={(key) => {
                  if (typeof key !== "string") return;
                  if (key === "reply") onReply(message);
                  else if (key === "pin") onPin(message.id);
                  else if (REACTION_EMOJIS.includes(key as (typeof REACTION_EMOJIS)[number])) {
                    onReact(message.id, key);
                  }
                }}
              >
                <Dropdown.Item id="reply" textValue="Responder">
                  <Reply className="size-4 shrink-0 text-massa-gold" />
                  <Label>Responder</Label>
                </Dropdown.Item>
                <Dropdown.Item id="pin" textValue="Fixar">
                  <Pin className="size-4 shrink-0 text-massa-gold" />
                  <Label>Fixar mensagem</Label>
                </Dropdown.Item>
                {REACTION_EMOJIS.map((emoji) => (
                  <Dropdown.Item key={emoji} id={emoji} textValue={`Reagir ${emoji}`}>
                    <Label>{emoji} Reagir</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export { replyPreviewBody };
