import { Spinner } from "@heroui/react";
import { Compass, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useConversationFilters, useConversations } from "../hooks/use-conversations.ts";
import type { ConversationFilterId } from "../types/messages.types.ts";
import { ConversationFilters } from "./ConversationFilters.tsx";
import { ConversationListItem } from "./ConversationListItem.tsx";

type ConversationListProps = {
  className?: string;
};

export function ConversationList({ className = "" }: ConversationListProps) {
  const [filter, setFilter] = useState<ConversationFilterId>("all");
  const [query, setQuery] = useState("");
  const filters = useConversationFilters();
  const conversations = useConversations(filter, query);

  return (
    <aside
      className={`flex h-full min-h-0 w-full flex-col border-r border-massa-border bg-fm-yellow-light overscroll-contain ${className}`}
    >
      <header className="flex items-center justify-between gap-2 px-4 pb-2 pt-4">
        <h1 className="text-xl font-bold tracking-tight text-massa-text">Conversas</h1>
        <Link
          to="/messages/explore"
          aria-label="Explorar grupos"
          className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
        >
          <Compass className="size-5" />
        </Link>
      </header>

      <div className="px-3 pb-3">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-massa-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar ou começar uma nova conversa"
            className="h-10 w-full rounded-full border border-massa-border bg-fm-yellow-light py-2 pr-3 pl-10 text-sm font-semibold text-massa-text outline-none placeholder:text-massa-muted focus:border-massa-gold/40"
          />
        </label>
      </div>

      {filters.data ? (
        <ConversationFilters filters={filters.data} selected={filter} onChange={setFilter} />
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto pb-16 lg:pb-0">
        {conversations.isLoading ? (
          <div className="flex justify-center py-10 text-massa-muted">
            <Spinner color="current" size="sm" />
          </div>
        ) : null}

        {!conversations.isLoading && (conversations.data?.length ?? 0) === 0 ? (
          <p className="px-4 py-10 text-center text-sm font-semibold text-massa-muted">
            Nenhuma conversa por aqui.
          </p>
        ) : null}

        <ul className="divide-y divide-massa-border/60">
          {conversations.data?.map((conversation) => (
            <li key={conversation.id}>
              <ConversationListItem conversation={conversation} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
