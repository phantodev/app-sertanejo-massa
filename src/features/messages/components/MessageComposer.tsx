import { Mic, Paperclip, SendHorizontal, Smile, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSendAudio, useSendMessage } from "../hooks/use-conversation.ts";
import type { MessageReplyPreview } from "../types/messages.types.ts";
import { MessageReplyCard } from "./MessageReplyCard.tsx";

type MessageComposerProps = {
  conversationId: string;
  replyTo: MessageReplyPreview | null;
  onCancelReply: () => void;
};

export function MessageComposer({ conversationId, replyTo, onCancelReply }: MessageComposerProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const send = useSendMessage(conversationId);
  const sendAudio = useSendAudio(conversationId);
  const canSend = text.trim().length > 0 && !send.isPending;

  function adjustHeight() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.overflow = "hidden";
    el.style.height = "auto";
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 48), 128)}px`;
  }

  useEffect(() => {
    adjustHeight();
  }, [text]);

  function submitText() {
    if (!canSend) return;
    const body = text.trim();
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    send.mutate({ body, replyTo: replyTo ?? undefined }, { onSuccess: () => onCancelReply() });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submitText();
  }

  return (
    <div className="z-10 shrink-0 border-t border-massa-border bg-fm-yellow-light">
      {replyTo ? (
        <div className="flex items-center gap-2 border-b border-massa-border/70 px-3 py-2">
          <MessageReplyCard reply={replyTo} mine className="min-w-0 flex-1" />
          <button
            type="button"
            aria-label="Cancelar resposta"
            onClick={onCancelReply}
            className="grid size-8 place-items-center rounded-full text-massa-muted hover:bg-fm-purple/10 hover:text-massa-gold"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <button
          type="button"
          aria-label="Emoji"
          className="grid size-10 shrink-0 place-items-center rounded-full text-massa-muted hover:bg-fm-purple/10 hover:text-massa-gold"
        >
          <Smile className="size-5" />
        </button>

        <div className="flex min-h-12 min-w-0 flex-1 items-center rounded-xl border border-fm-purple/25 bg-fm-yellow-bright px-2">
          <button
            type="button"
            aria-label="Anexar"
            className="grid size-9 shrink-0 place-items-center rounded-full text-massa-muted hover:text-massa-gold"
          >
            <Paperclip className="size-4" />
          </button>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitText();
              }
            }}
            rows={1}
            placeholder="Digite a mensagem"
            className="chat-composer-textarea max-h-32 min-h-12 min-w-0 flex-1 resize-none overflow-hidden bg-transparent px-1 py-[15px] text-xs font-semibold leading-[18px] text-fm-purple outline-none scrollbar-none placeholder:font-semibold placeholder:text-fm-purple"
          />
        </div>

        {canSend ? (
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Enviar"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-fm-purple text-white transition disabled:opacity-40"
          >
            <SendHorizontal className="size-5" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Enviar áudio (mock)"
            disabled={sendAudio.isPending}
            onClick={() => sendAudio.mutate(8 + Math.floor(Math.random() * 12))}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-fm-purple text-white transition disabled:opacity-40"
          >
            <Mic className="size-5" />
          </button>
        )}
      </form>
    </div>
  );
}
