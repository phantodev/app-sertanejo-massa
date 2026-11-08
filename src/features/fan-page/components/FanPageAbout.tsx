import { CalendarDays, Globe, Mail, MapPin, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { locationLabel } from "../../../shared/lib/location-label.ts";
import type { FanPageProfile } from "../types/fan-page.types.ts";

type FanPageAboutProps = {
  page: FanPageProfile;
};

function formatJoined(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(iso));
}

export function FanPageAbout({ page }: FanPageAboutProps) {
  return (
    <div className="space-y-5 px-4 py-5">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-fm-blue">Sobre</h3>
        <p className="mt-2 massa-description text-massa-text/90">{page.about}</p>
      </section>

      <section className="rounded-2xl border border-massa-border bg-fm-yellow-light p-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-fm-purple">
          O que você encontra aqui
        </h4>
        <ul className="mt-3 space-y-2 text-xs font-semibold text-massa-text">
          <li>• Lançamentos e clipes oficiais</li>
          <li>• Agenda de shows e eventos confirmados</li>
          <li>• Fotos e vídeos dos bastidores</li>
          <li>• Avisos e comunicados da dupla</li>
        </ul>
      </section>

      <ul className="space-y-3 border-t border-massa-border pt-4 text-xs font-semibold text-massa-muted">
        <li className="flex items-center gap-2.5">
          <MapPin className="size-4 shrink-0 text-fm-blue" />
          <span>{locationLabel(page.city, page.state)}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <CalendarDays className="size-4 shrink-0 text-fm-blue" />
          <span>Fan Page criada em {formatJoined(page.joinedAt)}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <Mail className="size-4 shrink-0 text-fm-blue" />
          <a href={`mailto:${page.contactEmail}`} className="text-fm-blue hover:underline">
            {page.contactEmail}
          </a>
        </li>
        <li className="flex items-center gap-2.5">
          <Globe className="size-4 shrink-0 text-fm-blue" />
          <a href={page.websiteUrl} className="text-fm-blue hover:underline">
            {page.websiteLabel}
          </a>
        </li>
        <li className="flex items-center gap-2.5">
          <UserRound className="size-4 shrink-0 text-fm-blue" />
          <Link to={`/${page.personalHandle}`} className="text-fm-blue hover:underline">
            @{page.personalHandle} — perfil pessoal
          </Link>
        </li>
      </ul>
    </div>
  );
}
