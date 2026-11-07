import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PLACEHOLDER_TITLES: Record<string, string> = {
  salvos: "Salvos",
  pesquisar: "Pesquisar",
  ultimas: "Últimas",
  ranking: "Ranking",
  shorts: "Shorts",
  "check-in": "Check-in",
  "criar-grupo": "Criar grupo",
  configuracoes: "Configurações",
  "contas-bloqueadas": "Contas bloqueadas",
  suporte: "Falar com o suporte",
  "reportar-problema": "Reportar um problema",
  "enviar-sugestao": "Enviar uma sugestão",
};

export function MenuPlaceholderPage() {
  const { feature = "" } = useParams();
  const title = PLACEHOLDER_TITLES[feature] ?? "Em breve";

  return (
    <div className="min-h-dvh bg-massa-bg text-massa-text">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-massa-border bg-fm-yellow-light/95 px-3 backdrop-blur-md">
        <Link
          to="/menu"
          aria-label="Voltar ao menu"
          className="grid size-10 place-items-center rounded-full text-fm-purple transition-colors hover:bg-fm-purple/10"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-base font-bold text-fm-purple">{title}</h1>
      </header>

      <main className="mx-auto grid min-h-[calc(100dvh-3.5rem)] w-full max-w-xl place-items-center px-5 py-10">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-fm-yellow-bright text-fm-purple">
            <Sparkles aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-fm-purple">Estamos preparando esta área</h2>
          <p className="mt-2 max-w-xs text-xs font-semibold text-massa-muted">
            {title} estará disponível em uma próxima atualização.
          </p>
          <Link
            to="/menu"
            className="mt-5 rounded-full bg-fm-purple px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-fm-purple-dark"
          >
            Voltar ao menu
          </Link>
        </div>
      </main>
    </div>
  );
}
