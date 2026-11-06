import { ArrowLeft, Plus, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type EventsMobileBarProps = {
  title?: string;
  filterActive?: boolean;
  onOpenFilters?: () => void;
};

export function EventsMobileBar({
  title = "Eventos",
  filterActive = false,
  onOpenFilters,
}: EventsMobileBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-massa-border bg-massa-bg/95 px-2 backdrop-blur-md lg:hidden">
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
        className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
      >
        <ArrowLeft className="size-5" />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-bold text-massa-text">
        {title}
      </h1>

      <div className="flex items-center">
        {onOpenFilters ? (
          <button
            type="button"
            aria-label="Filtros"
            onClick={onOpenFilters}
            className={`relative grid size-10 place-items-center rounded-full transition-colors hover:bg-fm-purple/10 ${
              filterActive ? "text-massa-gold" : "text-massa-gold/90"
            }`}
          >
            <SlidersHorizontal className="size-5" />
            {filterActive ? (
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-massa-gold" />
            ) : null}
          </button>
        ) : null}
        <Link
          to="/events/create"
          aria-label="Criar evento"
          className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
        >
          <Plus className="size-5" />
        </Link>
      </div>
    </header>
  );
}
