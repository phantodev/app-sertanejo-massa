import { Play } from "lucide-react";
import { useState } from "react";
import type { ProfileMediaItem } from "../types/profile.types.ts";

type ProfileMediaGridProps = {
  items: ProfileMediaItem[];
};

function MediaThumb({ item }: { item: ProfileMediaItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      className="group size-full"
      aria-label={item.type === "video" ? "Abrir vídeo" : "Abrir foto"}
    >
      {failed ? (
        <span className="absolute inset-0 bg-gradient-to-br from-[#3a2a1c] via-[#1b1714] to-[#12100e]" />
      ) : (
        <img
          src={item.url}
          alt=""
          className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
      {item.type === "video" ? (
        <span className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-black/55 text-massa-text backdrop-blur-sm">
          <Play className="size-3.5 fill-current" />
        </span>
      ) : null}
    </button>
  );
}

export function ProfileMediaGrid({ items }: ProfileMediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="px-4 py-16 text-center text-xs font-semibold text-massa-muted">
        Ainda não há fotos ou vídeos neste perfil.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-0.5 bg-massa-border/40">
      {items.map((item) => (
        <li key={item.id} className="relative aspect-square overflow-hidden bg-fm-yellow-light">
          <MediaThumb item={item} />
        </li>
      ))}
    </ul>
  );
}
