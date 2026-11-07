import { Spinner } from "@heroui/react";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useConversation, useReactToMessage } from "../hooks/use-conversation.ts";
import { formatDateDivider, sameDay } from "../lib/format-chat-time.ts";
import type { ChatMessage, MessageReplyPreview } from "../types/messages.types.ts";
import { ChatHeader } from "./ChatHeader.tsx";
import { MessageBubble, replyPreviewBody } from "./MessageBubble.tsx";
import { MessageComposer } from "./MessageComposer.tsx";
import { TypingIndicator } from "./TypingIndicator.tsx";

type ChatPanelProps = {
  conversationId: string;
};

export function ChatPanel({ conversationId }: ChatPanelProps) {
  const conversation = useConversation(conversationId);
  const react = useReactToMessage(conversationId);
  const endRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<MessageReplyPreview | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setReplyTo(null);
    setSearchOpen(false);
    setSearchQuery("");
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.data?.messages.length, conversation.data?.typing, conversationId]);

  const visibleMessages = useMemo(() => {
    const messages = conversation.data?.messages ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((message) => {
      if (message.kind === "system") return false;
      return (message.body ?? "").toLowerCase().includes(q);
    });
  }, [conversation.data?.messages, searchQuery]);

  if (conversation.isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-fm-yellow-light text-massa-muted">
        <Spinner color="current" size="sm" />
      </div>
    );
  }

  if (conversation.isError || !conversation.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-fm-yellow-light px-6 text-center">
        <p className="text-lg font-semibold text-massa-text">Conversa não encontrada</p>
        <Link to="/messages" className="text-sm font-semibold text-massa-gold">
          Voltar às mensagens
        </Link>
      </div>
    );
  }

  function handleReply(message: ChatMessage) {
    setReplyTo({
      id: message.id,
      authorName: message.mine ? "Você" : (message.authorName ?? "Contato"),
      body: replyPreviewBody(message),
      kind: message.kind,
      mediaUrl: message.kind === "image" ? message.mediaUrl : undefined,
    });
  }

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-fm-yellow-light">
      <ChatHeader
        conversation={conversation.data}
        searchOpen={searchOpen}
        onToggleSearch={() => {
          setSearchOpen((open) => !open);
          setSearchQuery("");
        }}
      />

      {searchOpen ? (
        <div className="flex shrink-0 items-center gap-2 border-b border-massa-border bg-fm-yellow-light px-3 py-2">
          <Search className="size-4 shrink-0 text-massa-muted" />
          <input
            autoFocus
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Pesquisar nesta conversa"
            className="h-9 w-full bg-transparent text-xs font-semibold text-massa-text outline-none placeholder:font-semibold placeholder:text-massa-muted"
          />
          <button
            type="button"
            aria-label="Fechar busca"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            className="grid size-8 place-items-center rounded-full text-massa-muted hover:bg-fm-purple/10"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <div
        className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top, rgba(233,179,111,0.06), transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9b36f' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
        }}
      >
        <div className="min-w-0 space-y-1 py-3 pb-4">
          {visibleMessages.map((message, index) => {
            const previous = visibleMessages[index - 1];
            const showDate =
              !searchQuery && (!previous || !sameDay(previous.createdAt, message.createdAt));
            const showAuthor =
              message.kind !== "system" &&
              !message.mine &&
              (!previous ||
                previous.mine ||
                previous.kind === "system" ||
                previous.authorId !== message.authorId ||
                showDate);

            return (
              <div key={message.id} id={`msg-${message.id}`}>
                {showDate ? (
                  <div className="flex justify-center px-4 py-3">
                    <span className="rounded-full border border-fm-blue bg-fm-blue px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                      {formatDateDivider(message.createdAt)}
                    </span>
                  </div>
                ) : null}
                <MessageBubble
                  message={message}
                  showAuthor={showAuthor}
                  onReply={handleReply}
                  onReact={(messageId, emoji) => react.mutate({ messageId, emoji })}
                />
              </div>
            );
          })}

          {conversation.data.typing ? (
            <TypingIndicator
              name={conversation.data.type === "dm" ? conversation.data.title : undefined}
            />
          ) : null}

          <div ref={endRef} />
        </div>
      </div>

      <MessageComposer
        conversationId={conversation.data.id}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
      />
    </section>
  );
}
