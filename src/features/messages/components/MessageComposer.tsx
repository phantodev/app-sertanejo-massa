import { Mic, Paperclip, SendHorizontal, Smile, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSendAudio, useSendMessage } from "../hooks/use-conversation.ts";
import type { MessageReplyPreview } from "../types/messages.types.ts";

type MessageComposerProps = {
  conversationId: string;
  placeholder?: string;
  replyTo: MessageReplyPreview | null;
  onCancelReply: () => void;
};

export function MessageComposer({
  conversationId,
  placeholder = "Digite uma mensagem",
  replyTo,
  onCancelReply,
}: MessageComposerProps) {
  const [text, setText] = useState("");
  const send = useSendMessage(conversationId);
  const sendAudio = useSendAudio(conversationId);
  const canSend = text.trim().length > 0 && !send.isPending;

  function submitText() {
    if (!canSend) return;
    const body = text.trim();
    setText("");
    send.mutate({ body, replyTo: replyTo ?? undefined }, { onSuccess: () => onCancelReply() });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submitText();
  }

  return (
    <div className="border-t border-massa-border bg-fm-yellow-light">
      {replyTo ? (
        <div className="flex items-center gap-2 border-b border-massa-border/70 px-3 py-2">
          <div className="min-w-0 flex-1 rounded-lg border-l-2 border-massa-gold bg-black/20 px-2.5 py-1.5">
            <p className="text-[11px] font-semibold text-massa-gold">
              Respondendo a {replyTo.authorName}
            </p>
            <p className="truncate text-[12px] text-massa-muted">{replyTo.body}</p>
          </div>
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

      <form onSubmit={handleSubmit} className="flex items-end gap-2 px-3 py-3">
        <button
          type="button"
          aria-label="Emoji"
          className="mb-1 grid size-10 place-items-center rounded-full text-massa-muted hover:bg-fm-purple/10 hover:text-massa-gold"
        >
          <Smile className="size-5" />
        </button>

        <div className="flex min-w-0 flex-1 items-end rounded-3xl border border-massa-border bg-fm-yellow-light px-2">
          <button
            type="button"
            aria-label="Anexar"
            className="mb-1 grid size-9 place-items-center rounded-full text-massa-muted hover:text-massa-gold"
          >
            <Paperclip className="size-4" />
          </button>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitText();
              }
            }}
            rows={1}
            placeholder={placeholder}
            className="max-h-28 min-h-11 w-full resize-none bg-transparent py-3 text-[15px] text-massa-text outline-none placeholder:text-massa-muted"
          />
        </div>

        {canSend ? (
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Enviar"
            className="mb-1 grid size-11 place-items-center rounded-full bg-fm-purple text-white transition disabled:opacity-40"
          >
            <SendHorizontal className="size-5" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Enviar áudio (mock)"
            disabled={sendAudio.isPending}
            onClick={() => sendAudio.mutate(8 + Math.floor(Math.random() * 12))}
            className="mb-1 grid size-11 place-items-center rounded-full bg-fm-purple text-white transition disabled:opacity-40"
          >
            <Mic className="size-5" />
          </button>
        )}
      </form>
    </div>
  );
}
