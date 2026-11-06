import { unsplash } from "../../../shared/lib/unsplash.ts";
import { findMockUser } from "../../session/services/session.mock.ts";
import type { User } from "../../session/types/session.types.ts";
import { periodFromHour } from "../lib/event-period.ts";
import type {
  EventAttendeePreview,
  EventDetail,
  EventFilterOptions,
  EventOrganizer,
  EventSummary,
} from "../types/events.types.ts";

function requireUser(id: string): User {
  const user = findMockUser(id);
  if (!user) throw new Error(`Mock user not found: ${id}`);
  return user;
}

function organizerFrom(userId: string, kind: EventOrganizer["kind"] = "person"): EventOrganizer {
  const user = requireUser(userId);
  return {
    id: user.id,
    handle: user.handle,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    verified: user.verified,
    city: user.city,
    state: user.state,
    kind,
  };
}

function attendees(userIds: string[]): EventAttendeePreview[] {
  return userIds.map((id) => {
    const user = requireUser(id);
    return { displayName: user.displayName, avatarUrl: user.avatarUrl };
  });
}

function atLocal(daysFromNow: number, hour: number, minute = 0): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

type EventSeed = Omit<EventDetail, "period" | "goingPreview" | "userRsvp"> & {
  goingUserIds: string[];
  userGoing?: boolean;
};

const SEEDS: EventSeed[] = [
  {
    id: "evt-viola-ao-vivo",
    slug: "viola-ao-vivo-curitiba",
    title: "Viola ao Vivo — Noite Massa",
    coverUrl: unsplash.photo("1514525253161-7a46d19cd819", 1200, 1200),
    startsAt: atLocal(2, 20, 0),
    venueName: "Casa da Viola",
    city: "Curitiba",
    state: "PR",
    addressLine: "Rua das Araucárias, 120 — Batel — Curitiba/PR",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Curitiba+PR",
    featured: true,
    goingCount: 48,
    goingUserIds: ["u-andre", "u-namu", "u-gold", "u-admin"],
    organizer: { ...organizerFrom("u-hotbar", "venue"), displayName: "HotBar" },
    description:
      "Noite especial de viola e voz na Casa da Viola. Mesa posta, som afinado e a galera Massa reunida pra viver o sertanejo de perto. Chegue cedo — a fila na porta costuma aquecer rápido.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [
      unsplash.photo("1493225457124-a3eb161ffa5f", 900, 900),
      unsplash.photo("1470225620780-dba8ba36b745", 900, 900),
      unsplash.photo("1501386761578-eac5c94b800a", 900, 900),
    ],
  },
  {
    id: "evt-rodeio-campinas",
    slug: "rodeio-noite-campinas",
    title: "Rodeio Night — Campinas",
    coverUrl: unsplash.photo("1501281668745-f7f57925c3b4", 1200, 1200),
    startsAt: atLocal(1, 21, 30),
    venueName: "Arena do Peão",
    city: "Campinas",
    state: "SP",
    addressLine: "Av. das Nações, 900 — Campinas/SP",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Campinas+SP",
    featured: false,
    goingCount: 126,
    goingUserIds: ["u-carlos", "u-andre", "u-sulsp"],
    organizer: organizerFrom("u-andre", "person"),
    description:
      "Botina limpa, chapéu na mão e o peito já aperta. Rodeio Night com lineup sertanejo, food trucks e camarote Massa pra quem vive a estrada de verdade.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [
      unsplash.photo("1540039155733-5bb30b53aa14", 900, 900),
      unsplash.photo("1492684223066-81342ee5ff30", 900, 900),
    ],
  },
  {
    id: "evt-churrasco-massa",
    slug: "churrasco-e-modao-pg",
    title: "Churrasco & Modão",
    coverUrl: unsplash.photo("1558981403-c5f9899a28bc", 1200, 1200),
    startsAt: atLocal(3, 12, 0),
    venueName: "Sítio Massa",
    city: "Ponta Grossa",
    state: "PR",
    addressLine: "Estrada da Boiadeira, km 4 — Ponta Grossa/PR",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ponta+Grossa+PR",
    featured: false,
    goingCount: 33,
    goingUserIds: ["u-namu", "u-gold", "u-jemhot"],
    organizer: organizerFrom("u-namu", "person"),
    userGoing: true,
    description:
      "Tarde de churrasco, modão no alto-falante e conversa boa. Traga a família da Massa — a mesa é grande e o fogo não apaga.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [unsplash.photo("1511671782779-c97d3d27a1d4", 900, 900)],
  },
  {
    id: "evt-balada-sertaneja-sp",
    slug: "balada-sertaneja-moema",
    title: "Balada Sertaneja — Moema",
    coverUrl: unsplash.photo("1470229722913-7c0e2dbbafd3", 1200, 1200),
    startsAt: atLocal(5, 22, 0),
    venueName: "Club Estrada",
    city: "São Paulo",
    state: "SP",
    addressLine: "Alameda dos Pamaris, 83 — Moema — São Paulo/SP",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=-23.6117615,-46.6680094",
    featured: true,
    goingCount: 89,
    goingUserIds: ["u-gold", "u-carlos", "u-sulsp", "u-hotbar"],
    organizer: { ...organizerFrom("u-hotbar", "venue"), displayName: "HotBar" },
    description:
      "A pista esquenta com o melhor do sertanejo universitário e raiz. Welcome drink pra quem chega até 23h. Vista o seu melhor look de boteco chique.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [
      unsplash.photo("1514525253161-7a46d19cd819", 900, 900),
      unsplash.photo("1460723237483-7a6dc9d0b212", 900, 900),
      unsplash.photo("1487180144351-b8472da7d491", 900, 900),
    ],
  },
  {
    id: "evt-manha-na-roça",
    slug: "manha-na-roca-maceio",
    title: "Manhã na Roça",
    coverUrl: unsplash.photo("1501386761578-eac5c94b800a", 1200, 1200),
    startsAt: atLocal(8, 9, 0),
    venueName: "Fazenda Alagoana",
    city: "Maceió",
    state: "AL",
    addressLine: "Rodovia do Sol, s/n — Maceió/AL",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Maceio+AL",
    featured: false,
    goingCount: 17,
    goingUserIds: ["u-alagoanos", "u-admin"],
    organizer: organizerFrom("u-alagoanos", "person"),
    description:
      "Café da manhã sertanejo, cavalgada leve e viola sob o sol. Ideal pra quem quer viver o campo sem perder a conversa boa da comunidade.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [unsplash.photo("1493225457124-a3eb161ffa5f", 900, 900)],
  },
  {
    id: "evt-after-madrugada",
    slug: "after-viola-curitiba",
    title: "After da Viola",
    coverUrl: unsplash.photo("1492684223066-81342ee5ff30", 1200, 1200),
    startsAt: atLocal(2, 1, 0),
    venueName: "Hotbar Massa",
    city: "Curitiba",
    state: "PR",
    addressLine: "Rua XV de Novembro, 450 — Centro — Curitiba/PR",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Curitiba+Centro",
    featured: false,
    goingCount: 22,
    goingUserIds: ["u-jemhot", "u-jagff", "u-ljsecret"],
    organizer: organizerFrom("u-jemhot", "person"),
    description:
      "Quando o show acaba, a conversa continua. After intimista com playlist Massa, drinks e quem ficou até o fim.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [unsplash.photo("1540039155733-5bb30b53aa14", 900, 900)],
  },
  {
    id: "evt-encontro-sulsp",
    slug: "encontro-sul-sp",
    title: "Encontro Sul de SP",
    coverUrl: unsplash.photo("1429962714451-bb934ecdc4ec", 1200, 1200),
    startsAt: atLocal(18, 19, 0),
    venueName: "Rancho do Sul",
    city: "São Paulo",
    state: "SP",
    addressLine: "Av. Cupecê, 2100 — Santo Amaro — São Paulo/SP",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santo+Amaro+SP",
    featured: false,
    goingCount: 41,
    goingUserIds: ["u-sulsp", "u-carlos", "u-safada10"],
    organizer: organizerFrom("u-sulsp", "person"),
    description:
      "Encontro mensal da galera do Sul de SP. Networking, música ao vivo e aquele refrão que cola. Traje: casual sertanejo.",
    disclaimer:
      "Este evento é de responsabilidade do organizador. O Sertanejo Massa não se responsabiliza pela realização.",
    gallery: [
      unsplash.photo("1470225620780-dba8ba36b745", 900, 900),
      unsplash.photo("1501281668745-f7f57925c3b4", 900, 900),
    ],
  },
];

function toDetail(seed: EventSeed): EventDetail {
  const starts = new Date(seed.startsAt);
  return {
    ...seed,
    period: periodFromHour(starts.getHours()),
    goingPreview: attendees(seed.goingUserIds),
    userRsvp: seed.userGoing ? "going" : "none",
  };
}

export const mockEvents: EventDetail[] = SEEDS.map(toDetail);

export function toSummary(event: EventDetail): EventSummary {
  const {
    description: _d,
    addressLine: _a,
    mapUrl: _m,
    disclaimer: _di,
    gallery: _g,
    ...summary
  } = event;
  return summary;
}

export function buildFilterOptions(events: EventDetail[]): EventFilterOptions {
  const states = [...new Set(events.map((event) => event.state))].sort();
  const citiesByState: Record<string, string[]> = {};

  for (const event of events) {
    const list = citiesByState[event.state] ?? [];
    if (!list.includes(event.city)) list.push(event.city);
    citiesByState[event.state] = list.sort();
  }

  return {
    states,
    citiesByState,
    periods: [
      { id: "madrugada", label: "Madrugada" },
      { id: "manha", label: "Manhã" },
      { id: "tarde", label: "Tarde" },
      { id: "noite", label: "Noite" },
    ],
  };
}
