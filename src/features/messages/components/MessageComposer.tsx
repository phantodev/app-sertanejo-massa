import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSendMessage } from "../hooks/use-conversation.ts";

type MessageComposerProps = {
  conversationId: string;
  placeholder?: string;
};

export function MessageComposer({
  conversationId,
  placeholder = "Digite uma mensagem",
}: MessageComposerProps) {
  const [text, setText] = useState("");
  const send = useSendMessage(conversationId);
  const canSend = text.trim().length > 0 && !send.isPending;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSend) return;
    const body = text.trim();
    setText("");
    send.mutate(body);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-massa-border bg-[#14110f] px-3 py-3"
    >
      <button
        type="button"
        aria-label="Emoji"
        className="mb-1 grid size-10 place-items-center rounded-full text-massa-muted hover:bg-white/5 hover:text-massa-gold"
      >
        <Smile className="size-5" />
      </button>

      <div className="flex min-w-0 flex-1 items-end rounded-3xl border border-massa-border bg-[#1b1714] px-2">
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
              if (canSend) {
                const body = text.trim();
                setText("");
                send.mutate(body);
              }
            }
          }}
          rows={1}
          placeholder={placeholder}
          className="max-h-28 min-h-11 w-full resize-none bg-transparent py-3 text-[15px] text-massa-text outline-none placeholder:text-massa-muted"
        />
      </div>

      <button
        type="submit"
        disabled={!canSend}
        aria-label="Enviar"
        className="mb-1 grid size-11 place-items-center rounded-full bg-massa-gold text-[#1a100b] transition disabled:opacity-40"
      >
        <SendHorizontal className="size-5" />
      </button>
    </form>
  );
}
