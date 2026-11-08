import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LatestMobileBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-massa-border bg-fm-yellow-light/95 px-2 backdrop-blur-md lg:hidden">
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

      <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-bold text-fm-purple">
        Últimas
      </h1>

      <button
        type="button"
        aria-label="Filtros em breve"
        disabled
        className="grid size-10 cursor-not-allowed place-items-center rounded-full text-fm-blue/40"
        title="Filtros em breve"
      >
        <SlidersHorizontal className="size-5" />
      </button>
    </header>
  );
}
