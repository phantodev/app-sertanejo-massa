import { Spinner } from "@heroui/react";
import { Compass } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MassaSearchField } from "../../../shared/ui/MassaSearchField.tsx";
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
      <header className="flex items-center justify-between gap-2 px-4 pt-2 pb-2">
        <h1 className="text-xl font-bold tracking-tight text-massa-text">Conversas</h1>
        <Link
          to="/messages/explore"
          aria-label="Explorar grupos"
          className="grid size-10 place-items-center rounded-full text-fm-blue hover:bg-fm-purple/10"
        >
          <Compass className="size-5" />
        </Link>
      </header>

      <div className="px-3 pb-3">
        <MassaSearchField
          aria-label="Pesquisar ou começar uma nova conversa"
          placeholder="Pesquisar ou começar uma nova conversa"
          value={query}
          onChange={setQuery}
        />
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
          <p className="px-4 py-10 text-center text-xs font-semibold text-massa-muted">
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
