import { MessagesSquare } from "lucide-react";

export function ChatEmptyState() {
  return (
    <div className="flex h-full min-w-0 flex-col items-center justify-center gap-4 bg-fm-yellow-light px-8 text-center">
      <div className="grid size-20 place-items-center rounded-3xl border border-massa-gold/25 bg-massa-gold/10 text-massa-gold">
        <MessagesSquare className="size-9" />
      </div>
      <div className="max-w-sm space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-massa-text">Mensagens Massa</h2>
        <p className="text-sm leading-relaxed text-massa-muted">
          Selecione uma conversa à esquerda para ler e responder. No celular, a lista abre o chat em
          tela cheia.
        </p>
      </div>
    </div>
  );
}
