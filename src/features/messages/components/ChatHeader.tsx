import { Dropdown, Label } from "@heroui/react";
import { ArrowLeft, BellOff, EllipsisVertical, Info, Search, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { ConversationDetail } from "../types/messages.types.ts";

type ChatHeaderProps = {
  conversation: ConversationDetail;
};

export function ChatHeader({ conversation }: ChatHeaderProps) {
  const isGroup = conversation.type === "group";
  const profileHref =
    conversation.type === "dm" && conversation.peerHandle
      ? `/${conversation.peerHandle}`
      : `/messages/${conversation.id}`;

  return (
    <header className="flex h-14 items-center gap-2 border-b border-massa-border bg-[#14110f]/95 px-2 backdrop-blur-md">
      <Link
        to="/messages"
        aria-label="Voltar para conversas"
        className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-white/5 lg:hidden"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <Link to={profileHref} className="flex min-w-0 flex-1 items-center gap-2.5 px-1">
        <img src={conversation.avatarUrl} alt="" className="size-9 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-massa-text">{conversation.title}</p>
          <p className="truncate text-[12px] text-massa-muted">
            {conversation.typing
              ? "digitando…"
              : isGroup
                ? `${conversation.memberCount ?? 0} membros`
                : (conversation.subtitle ?? "toque para ver o perfil")}
          </p>
        </div>
      </Link>

      <Dropdown>
        <button
          type="button"
          aria-label="Mais opções"
          className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-white/5"
        >
          <EllipsisVertical className="size-5" />
        </button>
        <Dropdown.Popover className="min-w-52 border border-massa-border bg-[#181411]">
          <Dropdown.Menu
            onAction={(key) => {
              // Phase 1: ações mock — hooks reais na Phase 2
              void key;
            }}
          >
            <Dropdown.Item id="search" textValue="Pesquisar">
              <Search className="size-4 shrink-0 text-massa-gold" />
              <Label>Pesquisar</Label>
            </Dropdown.Item>
            {isGroup ? (
              <Dropdown.Item id="members" textValue="Membros">
                <Users className="size-4 shrink-0 text-massa-gold" />
                <Label>Membros</Label>
              </Dropdown.Item>
            ) : null}
            <Dropdown.Item id="info" textValue={isGroup ? "Dados do grupo" : "Dados do contato"}>
              <Info className="size-4 shrink-0 text-massa-gold" />
              <Label>{isGroup ? "Dados do grupo" : "Dados do contato"}</Label>
            </Dropdown.Item>
            <Dropdown.Item id="mute" textValue="Silenciar">
              <BellOff className="size-4 shrink-0 text-massa-gold" />
              <Label>Silenciar</Label>
            </Dropdown.Item>
            <Dropdown.Item id="clear" textValue="Limpar conversa" variant="danger">
              <Trash2 className="size-4 shrink-0" />
              <Label>Limpar conversa</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </header>
  );
}
