import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotificationsMobileBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-massa-border bg-massa-bg/95 px-3 backdrop-blur-md lg:hidden">
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
        className="grid size-10 place-items-center rounded-full text-fm-purple transition-colors hover:bg-fm-purple/10"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-left text-[17px] font-bold text-fm-purple">
        Notificações
      </h1>
    </header>
  );
}
