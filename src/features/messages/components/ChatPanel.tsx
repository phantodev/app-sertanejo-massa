import { Spinner } from "@heroui/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useConversation } from "../hooks/use-conversation.ts";
import { formatDateDivider, sameDay } from "../lib/format-chat-time.ts";
import { ChatHeader } from "./ChatHeader.tsx";
import { MessageBubble } from "./MessageBubble.tsx";
import { MessageComposer } from "./MessageComposer.tsx";

type ChatPanelProps = {
  conversationId: string;
};

export function ChatPanel({ conversationId }: ChatPanelProps) {
  const conversation = useConversation(conversationId);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.data?.messages.length, conversationId]);

  if (conversation.isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#120f0d] text-massa-muted">
        <Spinner color="current" size="sm" />
      </div>
    );
  }

  if (conversation.isError || !conversation.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#120f0d] px-6 text-center">
        <p className="text-lg font-semibold text-massa-text">Conversa não encontrada</p>
        <Link to="/messages" className="text-sm font-semibold text-massa-gold">
          Voltar às mensagens
        </Link>
      </div>
    );
  }

  const { messages } = conversation.data;

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#120f0d]">
      <ChatHeader conversation={conversation.data} />

      <div
        className="relative min-h-0 flex-1 overflow-y-auto"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top, rgba(233,179,111,0.06), transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9b36f' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
        }}
      >
        <div className="space-y-1 py-3 pb-4">
          {messages.map((message, index) => {
            const previous = messages[index - 1];
            const showDate = !previous || !sameDay(previous.createdAt, message.createdAt);
            const showAuthor =
              message.kind !== "system" &&
              !message.mine &&
              (!previous ||
                previous.mine ||
                previous.kind === "system" ||
                previous.authorId !== message.authorId ||
                showDate);

            return (
              <div key={message.id}>
                {showDate ? (
                  <div className="flex justify-center px-4 py-3">
                    <span className="rounded-full border border-massa-border bg-[#1b1714]/95 px-3 py-1 text-[11px] font-medium text-massa-muted shadow-sm">
                      {formatDateDivider(message.createdAt)}
                    </span>
                  </div>
                ) : null}
                <MessageBubble message={message} showAuthor={showAuthor} />
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>

      <MessageComposer
        conversationId={conversation.data.id}
        placeholder={
          conversation.data.type === "group"
            ? `Mensagem para ${conversation.data.title}`
            : "Digite uma mensagem"
        }
      />
    </section>
  );
}
