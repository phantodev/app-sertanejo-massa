import { unsplash } from "../../../shared/lib/unsplash.ts";
import { findMockUser } from "../../session/services/session.mock.ts";
import type { FeedPost, FeedTab, PostLikePreview, SurveyBanner } from "../types/feed.types.ts";

function authorFrom(userId: string) {
  const user = findMockUser(userId);
  if (!user) {
    throw new Error(`Mock user not found: ${userId}`);
  }

  return {
    id: user.id,
    handle: user.handle,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    verified: user.verified,
    city: user.city,
    state: user.state,
  };
}

function likesFrom(userIds: string[]): PostLikePreview[] {
  return userIds.map((id) => {
    const user = findMockUser(id);
    if (!user) {
      throw new Error(`Mock user not found: ${id}`);
    }
    return {
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
  });
}

export const mockFeedTabs: FeedTab[] = [
  { id: "for-you", label: "Para você" },
  { id: "friends", label: "Amigos" },
];

export const mockSurveyBanner: SurveyBanner = {
  id: "survey-hts",
  title: "Sua opinião ajuda a melhorar a Massa",
  description: "Conte como está sua experiência. Leva menos de um minuto.",
  ctaLabel: "Responder",
  href: "/survey",
};

export const mockFeedPosts: FeedPost[] = [
  {
    id: "post-welcome-alagoanos",
    kind: "welcome",
    author: authorFrom("u-alagoanos"),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    title: "Boas-vindas, Alagoanos",
    body: "Novo perfil chegou à comunidade Sertanejo Massa.",
    ctaLabel: "Dizer oi",
    likes: 0,
    comments: 0,
    bookmarked: false,
    likedByPreview: [],
  },
  {
    id: "post-media-namu",
    kind: "media",
    author: authorFrom("u-namu"),
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    title: "",
    body: "Tem noite que o sertanejo não é só música — é memória.\nAquele verso que puxa o coração pra estrada e pra roça ao mesmo tempo.\nHoje o som tá alto e a mesa tá posta. Massa demais.",
    coverUrl: unsplash.photo("1511671782779-c97d3d27a1d4", 1080, 1350),
    likes: 128,
    comments: 14,
    bookmarked: false,
    likedByPreview: likesFrom(["u-andre", "u-gold", "u-ljsecret"]),
    latestComment: {
      authorHandle: "andre-daniel",
      authorDisplayName: "Andre Daniel",
      text: "Isso aí! Sertanejo raiz no talo 🔥",
    },
  },
  {
    id: "post-verified-andre",
    kind: "verified",
    author: authorFrom("u-andre"),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    title: "Perfil verificado",
    body: "Identidade conferida pelo time Massa. Conversas mais seguras pra todo mundo.",
    coverUrl: unsplash.photo("1493225457124-a3eb161ffa5f", 900, 520),
    ctaLabel: "Selo Massa oficial",
    likes: 0,
    comments: 0,
    bookmarked: false,
    likedByPreview: [],
  },
  {
    id: "post-media-carlos",
    kind: "media",
    author: authorFrom("u-carlos"),
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    title: "",
    body: "Show no fim de semana e o peito já aperta de saudade do palco.\nBotina limpa, chapéu na mão e playlist do Massa no repeat.\nQuem mais vive o sertanejo assim, de verdade?",
    coverUrl: unsplash.photo("1470225620780-dba8ba36b745", 1080, 1350),
    likes: 86,
    comments: 9,
    bookmarked: true,
    likedByPreview: likesFrom(["u-namu", "u-hotbar", "u-admin"]),
    latestComment: {
      authorHandle: "gold",
      authorDisplayName: "GOLD",
      text: "Essa vibe é pura Massa. Marca o próximo show!",
    },
  },
  {
    id: "post-welcome-andre",
    kind: "welcome",
    author: authorFrom("u-andre"),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    title: "Boas-vindas, Andre Daniel",
    body: "Novo perfil chegou à comunidade Sertanejo Massa.",
    ctaLabel: "Dizer oi",
    likes: 1,
    comments: 0,
    bookmarked: false,
    likedByPreview: likesFrom(["u-admin"]),
  },
  {
    id: "post-welcome-carlos",
    kind: "welcome",
    author: authorFrom("u-carlos"),
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    title: "Boas-vindas, Carlos_Aline",
    body: "Novo perfil chegou à comunidade Sertanejo Massa.",
    ctaLabel: "Dizer oi",
    likes: 6,
    comments: 0,
    bookmarked: false,
    likedByPreview: likesFrom(["u-admin", "u-gold", "u-namu"]),
  },
  {
    id: "post-welcome-namu",
    kind: "welcome",
    author: authorFrom("u-namu"),
    createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
    title: "Boas-vindas, Namu",
    body: "Novo perfil chegou à comunidade Sertanejo Massa.",
    ctaLabel: "Dizer oi",
    likes: 3,
    comments: 0,
    bookmarked: false,
    likedByPreview: likesFrom(["u-admin", "u-andre"]),
  },
];
