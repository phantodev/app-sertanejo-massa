import { Pin, X } from "lucide-react";
import type { ChatMessage } from "../types/messages.types.ts";

type ChatPinnedBarProps = {
  message: ChatMessage;
  onUnpin: () => void;
  onJump?: () => void;
};

export function ChatPinnedBar({ message, onUnpin, onJump }: ChatPinnedBarProps) {
  const preview =
    message.kind === "audio"
      ? "Áudio"
      : message.kind === "image"
        ? (message.body ?? "Imagem")
        : (message.body ?? "");

  return (
    <div className="flex items-center gap-2 border-b border-massa-border bg-[#1b1714] px-3 py-2">
      <button
        type="button"
        onClick={onJump}
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        <Pin className="size-3.5 shrink-0 fill-massa-gold text-massa-gold" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-massa-gold">Mensagem fixada</p>
          <p className="truncate text-[12px] text-massa-muted">
            {message.authorName ? `${message.authorName}: ` : ""}
            {preview}
          </p>
        </div>
      </button>
      <button
        type="button"
        aria-label="Desafixar"
        onClick={onUnpin}
        className="grid size-8 place-items-center rounded-full text-massa-muted hover:bg-white/5 hover:text-massa-gold"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
