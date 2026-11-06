import { unsplash } from "../../../shared/lib/unsplash.ts";
import { findMockUser } from "../../session/services/session.mock.ts";
import type { FeedPost, FeedTab, SurveyBanner } from "../types/feed.types.ts";

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
    likedByPreview: ["Admin Massa"],
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
    likedByPreview: ["Admin Massa", "GOLD"],
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
    likedByPreview: ["Admin Massa"],
  },
];
