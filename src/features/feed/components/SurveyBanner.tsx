import { Heart, X } from "lucide-react";
import { useState } from "react";
import type { SurveyBanner as SurveyBannerType } from "../types/feed.types.ts";

type SurveyBannerProps = {
  survey: SurveyBannerType;
};

export function SurveyBanner({ survey }: SurveyBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mx-4 my-3 flex items-start gap-3 rounded-2xl bg-fm-teal px-4 py-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-fm-teal-dark/25 text-fm-purple">
        <Heart className="size-4 fill-current" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-massa-text">{survey.title}</p>
        <p className="mt-0.5 text-xs text-massa-muted">{survey.description}</p>
        <a
          href={survey.href}
          className="mt-2 inline-block text-sm font-semibold text-fm-purple hover:text-fm-purple-dark"
        >
          {survey.ctaLabel}
        </a>
      </div>
      <button
        type="button"
        aria-label="Dispensar pesquisa"
        onClick={() => setVisible(false)}
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-fm-teal-dark text-fm-purple transition hover:brightness-110"
      >
        <X className="size-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
