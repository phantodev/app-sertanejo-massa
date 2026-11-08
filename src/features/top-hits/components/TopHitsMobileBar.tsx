import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TopHitsMobileBarProps = {
  scopeLabel: string;
};

export function TopHitsMobileBar({ scopeLabel }: TopHitsMobileBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-massa-border bg-fm-yellow-light/95 px-2 backdrop-blur-md lg:hidden">
      <button
        type="button"
        aria-label="Voltar"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
            return;
          }
          navigate("/feed");
        }}
        className="grid size-10 place-items-center rounded-full text-fm-blue hover:bg-fm-purple/10"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-center text-[17px] font-bold text-fm-purple">Ranking</h1>
      </div>
      <div
        className="flex max-w-[42%] items-center gap-1 rounded-full border border-fm-purple/25 bg-fm-yellow-bright px-2.5 py-1"
        title="Filtro por estado em breve"
      >
        <MapPin className="size-3.5 shrink-0 text-fm-blue" aria-hidden />
        <span className="truncate text-xs font-semibold text-fm-purple">{scopeLabel}</span>
      </div>
    </header>
  );
}
