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
          className="btn-fm-teal flex-1 rounded-full bg-fm-teal-dark font-semibold text-white"
          fullWidth
        >
          <Check className="size-4 text-white" />
          Amigos
        </Button>
      ) : null}

      <Button
        className="btn-fm-purple flex-1 rounded-full bg-fm-purple font-semibold text-white"
        fullWidth
        aria-label={`Mensagem para ${displayName}`}
      >
        <MessageCircle className="size-4 text-white" />
        Mensagem
      </Button>

      <Button
        isIconOnly
        aria-label="Mais opções"
        className="btn-fm-blue size-10 shrink-0 rounded-full bg-fm-blue text-white"
      >
        <Ellipsis className="size-4 text-white" />
      </Button>
    </div>
  );
}
