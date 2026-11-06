import { ArrowLeft, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type ProfileMobileBarProps = {
  displayName: string;
};

export function ProfileMobileBar({ displayName }: ProfileMobileBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-massa-border bg-massa-bg/95 px-2 backdrop-blur-md lg:hidden">
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
        className="grid size-10 place-items-center rounded-full text-massa-text transition-colors hover:bg-fm-purple/10"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-massa-text">{displayName}</p>
        <Link to="/feed" className="text-[11px] text-massa-muted hover:text-massa-gold">
          Voltar ao feed
        </Link>
      </div>

      <button
        type="button"
        aria-label="Compartilhar perfil"
        className="grid size-10 place-items-center rounded-full text-massa-gold transition-colors hover:bg-fm-purple/10"
      >
        <Share2 className="size-4" />
      </button>
    </header>
  );
}
