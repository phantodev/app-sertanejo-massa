import { Button } from "@heroui/react";
import { Check, Ellipsis, MessageCircle, UserPlus, UserRoundPen } from "lucide-react";
import { useState } from "react";
import type { FriendshipStatus } from "../types/profile.types.ts";

type ProfileActionsProps = {
  status: FriendshipStatus;
  displayName: string;
};

export function ProfileActions({ status: initialStatus, displayName }: ProfileActionsProps) {
  const [status, setStatus] = useState(initialStatus);

  if (status === "self") {
    return (
      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-massa-gold font-semibold text-[#1a100b]" fullWidth>
          <UserRoundPen className="size-4" />
          Editar perfil
        </Button>
        <Button
          isIconOnly
          variant="secondary"
          aria-label="Mais opções"
          className="shrink-0 border border-massa-border bg-fm-yellow-light"
        >
          <Ellipsis className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === "none" ? (
        <Button
          className="flex-1 bg-massa-gold font-semibold text-[#1a100b]"
          fullWidth
          onPress={() => setStatus("pending")}
        >
          <UserPlus className="size-4" />
          Solicitar amizade
        </Button>
      ) : null}

      {status === "pending" ? (
        <Button
          className="flex-1 border border-massa-gold/35 bg-massa-gold/10 font-semibold text-massa-gold"
          fullWidth
          variant="secondary"
          onPress={() => setStatus("none")}
        >
          Solicitação enviada
        </Button>
      ) : null}

      {status === "friends" ? (
        <Button
          className="flex-1 border border-massa-border bg-fm-yellow-light font-semibold text-massa-text"
          fullWidth
          variant="secondary"
        >
          <Check className="size-4 text-massa-gold" />
          Amigos
        </Button>
      ) : null}

      <Button
        className="flex-1 border border-massa-border bg-fm-yellow-light font-semibold text-massa-text"
        fullWidth
        variant="secondary"
        aria-label={`Mensagem para ${displayName}`}
      >
        <MessageCircle className="size-4" />
        Mensagem
      </Button>

      <Button
        isIconOnly
        variant="secondary"
        aria-label="Mais opções"
        className="shrink-0 border border-massa-border bg-fm-yellow-light"
      >
        <Ellipsis className="size-4" />
      </Button>
    </div>
  );
}
