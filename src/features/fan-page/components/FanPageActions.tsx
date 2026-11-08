import { Button } from "@heroui/react";
import { Bell, Check, Ellipsis, MessageCircle, UserPlus } from "lucide-react";
import { useState } from "react";

type FanPageActionsProps = {
  displayName: string;
  initialFollowing: boolean;
};

export function FanPageActions({ displayName, initialFollowing }: FanPageActionsProps) {
  const [following, setFollowing] = useState(initialFollowing);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {following ? (
        <Button
          className="min-w-0 flex-1 rounded-full border border-fm-teal-dark/40 bg-fm-teal-dark/15 font-semibold text-fm-teal-dark"
          fullWidth
          variant="secondary"
          onPress={() => setFollowing(false)}
        >
          <Check className="size-4" />
          Seguindo
        </Button>
      ) : (
        <Button
          className="btn-fm-blue min-w-0 flex-1 rounded-full font-semibold text-white"
          fullWidth
          onPress={() => setFollowing(true)}
        >
          <UserPlus className="size-4" />
          Seguir Fan Page
        </Button>
      )}

      <Button
        className="btn-fm-purple min-w-0 flex-1 rounded-full bg-fm-purple font-semibold text-white"
        fullWidth
        aria-label={`Mensagem para ${displayName}`}
      >
        <MessageCircle className="size-4 text-white" />
        Mensagem
      </Button>

      <Button
        isIconOnly
        aria-label="Ativar notificações da Fan Page"
        className="size-10 shrink-0 rounded-full border border-massa-border bg-fm-yellow-light text-fm-purple"
      >
        <Bell className="size-4" />
      </Button>

      <Button
        isIconOnly
        aria-label="Mais opções"
        className="size-10 shrink-0 rounded-full border border-massa-border bg-fm-yellow-light text-fm-purple"
      >
        <Ellipsis className="size-4" />
      </Button>
    </div>
  );
}
