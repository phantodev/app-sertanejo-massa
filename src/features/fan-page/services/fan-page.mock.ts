import { unsplash } from "../../../shared/lib/unsplash.ts";
import { mockEvents, toSummary } from "../../events/services/events.mock.ts";
import type { FeedPost } from "../../feed/types/feed.types.ts";
import { findMockUser, findMockUserByHandle } from "../../session/services/session.mock.ts";
import type { EventSummary } from "../../events/types/events.types.ts";
import type { FanPageProfile } from "../types/fan-page.types.ts";

const ALAGOANOS_AUTHOR = {
  id: "fp-alagoanos",
  handle: "alagoanos-oficial",
  displayName: "Alagoanos — Oficial",
  avatarUrl: "/assets/foto-alagoanos-avatar.png",
  verified: true,
  city: "Maceió",
  state: "AL",
} as const;

function likesFrom(handles: string[]) {
  return handles.flatMap((handle) => {
    const user = findMockUserByHandle(handle);
    if (!user) return [];
    return [{ displayName: user.displayName, avatarUrl: user.avatarUrl }];
  });
}

const fanPagePosts: FeedPost[] = [
  {
    id: "fp-post-lancamento",
    kind: "media",
    author: ALAGOANOS_AUTHOR,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    title: "",
    body: "Trecho novo no estúdio! Em breve vocês escutam completo na Fan Page e nas plataformas. Quem tá ansioso? 🎤",
    coverUrl: "/assets/foto-alagoanos.png",
    likes: 312,
    comments: 28,
    bookmarked: false,
    likedByPreview: likesFrom(["gold", "namu", "carlos-aline"]),
    latestComment: {
      authorHandle: "namu",
      authorDisplayName: "Namu",
      text: "Ansiosíssimo! Massa demais essa prévia 🔥",
    },
  },
  {
    id: "fp-post-agenda",
    kind: "text",
    author: ALAGOANOS_AUTHOR,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    title: "Agenda atualizada",
    body: "Confira a aba Agenda aqui na Fan Page: shows em Maceió, Recife e Aracaju nas próximas semanas. Marca presença pelo app!",
    likes: 89,
    comments: 11,
    bookmarked: true,
    likedByPreview: likesFrom(["andre-daniel", "gold"]),
  },
  {
    id: "fp-post-bastidores",
    kind: "media",
    author: ALAGOANOS_AUTHOR,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    title: "",
    body: "Bastidores do último ensaio — viola, harmonização e muita risada. É assim que a gente prepara o show!",
    coverUrl: unsplash.photo("1514525253161-7a46d19cd819", 1080, 1350),
    likes: 201,
    comments: 19,
    bookmarked: false,
    likedByPreview: likesFrom(["ljsecret", "jemhot"]),
  },
];

const fanPageMedia = [
  {
    id: "fp-media-1",
    postId: "fp-post-lancamento",
    type: "photo" as const,
    url: "/assets/foto-alagoanos.png",
    createdAt: fanPagePosts[0]!.createdAt,
  },
  {
    id: "fp-media-2",
    postId: "fp-post-bastidores",
    type: "video" as const,
    url: unsplash.photo("1514525253161-7a46d19cd819", 640, 640),
    createdAt: fanPagePosts[2]!.createdAt,
  },
  {
    id: "fp-media-3",
    postId: "fp-media-3",
    type: "photo" as const,
    url: unsplash.photo("1470225620780-dba8ba36b745", 640, 640),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fp-media-4",
    postId: "fp-media-4",
    type: "photo" as const,
    url: unsplash.photo("1493225457124-a3eb161ffa5f", 640, 640),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fp-media-5",
    postId: "fp-media-5",
    type: "video" as const,
    url: unsplash.photo("1501281668745-f7f57925c3b4", 640, 640),
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fp-media-6",
    postId: "fp-media-6",
    type: "photo" as const,
    url: unsplash.photo("1540039155733-5bb30b53aa14", 640, 640),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function buildAlagoanosFanPage(): FanPageProfile {
  const personal = findMockUser("u-alagoanos");
  if (!personal) throw new Error("Mock user u-alagoanos missing");

  const organizerEvents = mockEvents
    .filter((event) => event.organizer.handle === "alagoanos")
    .map(toSummary);

  const extraEvent: EventSummary = {
    id: "evt-alagoanos-praia",
    slug: "alagoanos-sunset-praia",
    title: "Alagoanos na Orla — Sunset",
    coverUrl: "/assets/foto-alagoanos.png",
    startsAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    period: "noite",
    venueName: "Orla de Pajuçara",
    city: "Maceió",
    state: "AL",
    featured: true,
    goingCount: 234,
    goingPreview: likesFrom(["gold", "namu", "carlos-aline", "andre-daniel"]),
    organizer: {
      id: ALAGOANOS_AUTHOR.id,
      handle: ALAGOANOS_AUTHOR.handle,
      displayName: ALAGOANOS_AUTHOR.displayName,
      avatarUrl: ALAGOANOS_AUTHOR.avatarUrl,
      verified: ALAGOANOS_AUTHOR.verified,
      city: ALAGOANOS_AUTHOR.city,
      state: ALAGOANOS_AUTHOR.state,
      kind: "person",
    },
    userRsvp: "none",
  };

  const events = [extraEvent, ...organizerEvents];

  return {
    handle: ALAGOANOS_AUTHOR.handle,
    displayName: ALAGOANOS_AUTHOR.displayName,
    avatarUrl: ALAGOANOS_AUTHOR.avatarUrl,
    coverUrl: "/assets/foto-alagoanos.png",
    category: "Dupla sertaneja · Artista",
    verified: true,
    city: ALAGOANOS_AUTHOR.city,
    state: ALAGOANOS_AUTHOR.state,
    shortBio:
      "Canal oficial da dupla Alagoanos — lançamentos, agenda de shows, bastidores e novidades pra fã.",
    about:
      "A Fan Page Alagoanos reúne tudo que importa pra quem acompanha a dupla: agenda confirmada, prévias de músicas, fotos e vídeos dos shows e comunicados oficiais. O perfil pessoal dos integrantes continua separado pra conversa mais próxima com amigos e família.",
    personalHandle: personal.handle,
    personalDisplayName: personal.displayName,
    joinedAt: "2019-03-12T12:00:00.000Z",
    contactEmail: "contato@alagoanosoficial.massa.app",
    websiteLabel: "alagoanosoficial.massa.app",
    websiteUrl: "https://alagoanosoficial.massa.app",
    followerCount: 18_420,
    followingCount: 42,
    isFollowing: false,
    highlights: ["Lançamentos", "Agenda de shows", "Bastidores", "Contato comercial"],
    stats: {
      posts: fanPagePosts.length,
      media: fanPageMedia.length,
      events: events.length,
    },
    posts: fanPagePosts,
    media: fanPageMedia,
    events,
    author: ALAGOANOS_AUTHOR,
  };
}

const FAN_PAGES: Record<string, () => FanPageProfile> = {
  "alagoanos-oficial": buildAlagoanosFanPage,
};

export function buildMockFanPage(handle: string): FanPageProfile | null {
  const key = handle.toLowerCase();
  const factory = FAN_PAGES[key];
  if (!factory) return null;
  return structuredClone(factory());
}
