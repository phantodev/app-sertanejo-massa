import { Dropdown, Label } from "@heroui/react";
import {
  ArrowLeft,
  Bell,
  BellOff,
  EllipsisVertical,
  Info,
  Search,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useClearConversation,
  useToggleFavorite,
  useToggleMute,
} from "../hooks/use-conversation.ts";
import type { ConversationDetail } from "../types/messages.types.ts";

type ChatHeaderProps = {
  conversation: ConversationDetail;
  searchOpen: boolean;
  onToggleSearch: () => void;
};

export function ChatHeader({ conversation, searchOpen, onToggleSearch }: ChatHeaderProps) {
  const navigate = useNavigate();
  const isGroup = conversation.type === "group";
  const mute = useToggleMute(conversation.id);
  const favorite = useToggleFavorite(conversation.id);
  const clear = useClearConversation(conversation.id);

  const profileHref =
    conversation.type === "dm" && conversation.peerHandle
      ? `/${conversation.peerHandle}`
      : `/messages/${conversation.id}/info`;

  return (
    <header className="flex h-14 items-center gap-2 border-b border-massa-border bg-fm-yellow-light/95 px-2 backdrop-blur-md">
      <Link
        to="/messages"
        aria-label="Voltar para conversas"
        className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10 lg:hidden"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <Link to={profileHref} className="flex min-w-0 flex-1 items-center gap-2.5 px-1">
        <img src={conversation.avatarUrl} alt="" className="size-9 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-fm-blue">{conversation.title}</p>
          <p
            className={`truncate text-[12px] font-semibold ${
              conversation.typing ? "text-fm-purple" : "text-massa-muted"
            }`}
          >
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
          className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
        >
          <EllipsisVertical className="size-5" />
        </button>
        <Dropdown.Popover className="min-w-52 border border-massa-border bg-fm-yellow-light">
          <Dropdown.Menu
            onAction={(key) => {
              if (typeof key !== "string") return;
              if (key === "search") onToggleSearch();
              if (key === "members" || key === "info") {
                if (isGroup) navigate(`/messages/${conversation.id}/info`);
                else if (conversation.peerHandle) navigate(`/${conversation.peerHandle}`);
              }
              if (key === "mute") mute.mutate();
              if (key === "favorite") favorite.mutate();
              if (key === "clear") clear.mutate();
            }}
          >
            <Dropdown.Item id="search" textValue={searchOpen ? "Fechar busca" : "Pesquisar"}>
              <Search className="size-4 shrink-0 text-massa-gold" />
              <Label>{searchOpen ? "Fechar busca" : "Pesquisar"}</Label>
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
            <Dropdown.Item
              id="mute"
              textValue={conversation.muted ? "Ativar notificações" : "Silenciar"}
            >
              {conversation.muted ? (
                <Bell className="size-4 shrink-0 text-massa-gold" />
              ) : (
                <BellOff className="size-4 shrink-0 text-massa-gold" />
              )}
              <Label>{conversation.muted ? "Ativar notificações" : "Silenciar"}</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="favorite"
              textValue={conversation.favorite ? "Remover dos favoritos" : "Favoritar"}
            >
              <Star
                className={`size-4 shrink-0 text-massa-gold ${conversation.favorite ? "fill-massa-gold" : ""}`}
              />
              <Label>{conversation.favorite ? "Remover dos favoritos" : "Favoritar"}</Label>
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
