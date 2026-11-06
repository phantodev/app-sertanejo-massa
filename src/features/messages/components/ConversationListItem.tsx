import { Pin, VolumeX } from "lucide-react";
import { NavLink } from "react-router-dom";
import { VerifiedBadge } from "../../../shared/ui/VerifiedBadge.tsx";
import { formatInboxTime } from "../lib/format-chat-time.ts";
import type { ConversationSummary } from "../types/messages.types.ts";

type ConversationListItemProps = {
  conversation: ConversationSummary;
};

export function ConversationListItem({ conversation }: ConversationListItemProps) {
  return (
    <NavLink
      to={`/messages/${conversation.id}`}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 transition-colors ${
          isActive ? "bg-massa-gold/12" : "hover:bg-fm-yellow-light/[0.03]"
        }`
      }
    >
      <div className="relative shrink-0">
        <img
          src={conversation.avatarUrl}
          alt=""
          className="size-12 rounded-full object-cover"
          loading="lazy"
        />
        {conversation.typing ? (
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-massa-bg bg-massa-gold" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <p className="truncate text-[15px] font-semibold text-massa-text">
              {conversation.title}
            </p>
            {conversation.verified ? <VerifiedBadge size="md" /> : null}
            {conversation.muted ? <VolumeX className="size-3.5 shrink-0 text-massa-muted" /> : null}
            {conversation.pinned ? (
              <Pin className="size-3 shrink-0 fill-massa-muted text-massa-muted" />
            ) : null}
          </div>
          <span
            className={`shrink-0 text-[11px] ${
              conversation.unreadCount > 0 ? "font-semibold text-massa-gold" : "text-massa-muted"
            }`}
          >
            {formatInboxTime(conversation.lastMessageAt)}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate text-[13px] ${
              conversation.typing
                ? "font-medium text-massa-gold"
                : conversation.unreadCount > 0
                  ? "font-medium text-massa-text/85"
                  : "text-massa-muted"
            }`}
          >
            {conversation.typing ? "digitando…" : conversation.lastMessagePreview}
          </p>
          {conversation.unreadCount > 0 ? (
            <span className="grid min-w-5 place-items-center rounded-full bg-massa-gold px-1.5 py-0.5 text-[10px] font-bold text-[#1a100b]">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </NavLink>
  );
}
