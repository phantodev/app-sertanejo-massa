import { CloseButton } from "@heroui/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { SurveyBanner as SurveyBannerType } from "../types/feed.types.ts";

type SurveyBannerProps = {
  survey: SurveyBannerType;
};

export function SurveyBanner({ survey }: SurveyBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mx-4 my-3 flex items-start gap-3 rounded-2xl border border-massa-gold/25 bg-massa-gold/10 px-4 py-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-massa-gold/20 text-massa-gold">
        <Heart className="size-4 fill-current" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-massa-text">{survey.title}</p>
        <p className="mt-0.5 text-xs text-massa-muted">{survey.description}</p>
        <a
          href={survey.href}
          className="mt-2 inline-block text-sm font-semibold text-massa-gold hover:text-massa-gold-light"
        >
          {survey.ctaLabel}
        </a>
      </div>
      <CloseButton aria-label="Dispensar pesquisa" onPress={() => setVisible(false)} />
    </div>
  );
}
