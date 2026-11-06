import { unsplash } from "../../../shared/lib/unsplash.ts";
import { mockFeedPosts } from "../../feed/services/feed.mock.ts";
import type { FeedPost, PostAuthor } from "../../feed/types/feed.types.ts";
import {
  findMockUser,
  findMockUserByHandle,
  mockCurrentUser,
} from "../../session/services/session.mock.ts";
import type { User } from "../../session/types/session.types.ts";
import type { ProfileMediaItem, UserProfile } from "../types/profile.types.ts";

function toAuthor(user: User): PostAuthor {
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

function likesFrom(userIds: string[]) {
  return userIds.flatMap((id) => {
    const user = findMockUser(id);
    if (!user) return [];
    return [{ displayName: user.displayName, avatarUrl: user.avatarUrl }];
  });
}

function buildWelcomePost(user: User): FeedPost {
  return {
    id: `profile-welcome-${user.handle}`,
    kind: "welcome",
    author: toAuthor(user),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    title: `Boas-vindas, ${user.displayName}`,
    body: "Novo perfil chegou à comunidade Sertanejo Massa.",
    ctaLabel: "Dizer oi",
    likes: 0,
    comments: 0,
    bookmarked: false,
    likedByPreview: [],
  };
}

function buildSampleMediaPost(user: User): FeedPost {
  const commenter = findMockUser("u-gold") ?? findMockUser("u-andre") ?? mockCurrentUser;

  return {
    id: `profile-media-${user.handle}`,
    kind: "media",
    author: toAuthor(user),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    title: "",
    body: "Estrada longa, viola no banco e o sertanejo no volume máximo.\nQuem mais tá nessa vibe hoje? Massa demais por aqui.",
    coverUrl: unsplash.photo("1511671782779-c97d3d27a1d4", 1080, 1350),
    likes: 47,
    comments: 6,
    bookmarked: false,
    likedByPreview: likesFrom(["u-andre", "u-namu", "u-admin"]),
    latestComment: {
      authorHandle: commenter.handle,
      authorDisplayName: commenter.displayName,
      text: "Que foto massa! Essa energia é raiz de verdade 🔥",
    },
  };
}

function buildProfilePosts(user: User): FeedPost[] {
  const own = mockFeedPosts.filter((post) => post.author.handle === user.handle);
  if (own.length === 0) {
    return [buildWelcomePost(user), buildSampleMediaPost(user)];
  }

  if (own.some((post) => post.kind === "media")) {
    return own;
  }

  return [...own, buildSampleMediaPost(user)];
}

const BIOS: Record<string, string> = {
  gold: "Curitiba na veia, sertanejo no peito. Aqui a mesa é grande e o som não para.",
  alagoanos:
    "Maceió, sol quente e viola no peito. Chegando agora na Massa pra viver o som de verdade.",
  "andre-daniel": "Campinas · perfil verificado. Entre um rodeio e outro, o sertanejo é companhia.",
  "carlos-aline": "São Paulo não apaga a raiz. Botina, chapéu e playlist Massa no repeat.",
  namu: "Ponta Grossa cantando alto. Quem curte verso que dói e cura, chega junto.",
  ljsecret: "Noite, luz baixa e um chorinho bom. Sertanejo é sentimento.",
  safada10: "Palco, plateia e aquele refrão que cola. Vamos de Massa.",
  sulsp: "Sul de SP com sotaque de estrada. Sempre em busca do próximo show.",
  jagff: "Cerveja gelada, viola afinada. Simples assim.",
  jemhot: "Curitiba underground do sertanejo contemporâneo.",
  hotbar: "Onde o povo encontra o som. Hotbar na Massa.",
  admin: "Time Massa. Cuidando da comunidade com carinho e firmeza.",
};

const COVERS: Record<string, string> = {
  default: unsplash.photo("1501386761578-eac5c94b800a", 1600, 640),
  gold: unsplash.photo("1514525253161-7a46d19cd819", 1600, 640),
  namu: unsplash.photo("1470225620780-dba8ba36b745", 1600, 640),
  "andre-daniel": unsplash.photo("1493225457124-a3eb161ffa5f", 1600, 640),
  "carlos-aline": unsplash.photo("1501281668745-f7f57925c3b4", 1600, 640),
};

function mediaFromPosts(handle: string): ProfileMediaItem[] {
  return mockFeedPosts
    .filter((post) => post.author.handle === handle && post.coverUrl)
    .map((post, index) => ({
      id: `media-${post.id}`,
      postId: post.id,
      type: index % 4 === 0 ? ("video" as const) : ("photo" as const),
      url: post.coverUrl!,
      createdAt: post.createdAt,
    }));
}

export function buildMockProfile(handle: string): UserProfile | null {
  const user = findMockUserByHandle(handle);
  if (!user) return null;

  const posts = buildProfilePosts(user);
  const media = mediaFromPosts(user.handle);

  // Extra mídia de galeria pra enriquecer a aba (IDs Unsplash validados)
  const galleryExtras: ProfileMediaItem[] = [
    {
      type: "photo" as const,
      url: unsplash.photo("1511671782779-c97d3d27a1d4", 800, 800),
    },
    {
      type: "photo" as const,
      url: unsplash.photo("1487180144351-b8472da7d491", 800, 800),
    },
    {
      type: "video" as const,
      url: unsplash.photo("1492684223066-81342ee5ff30", 800, 800),
    },
    {
      type: "photo" as const,
      url: unsplash.photo("1460723237483-7a6dc9d0b212", 800, 800),
    },
    {
      type: "video" as const,
      url: unsplash.photo("1540039155733-5bb30b53aa14", 800, 800),
    },
    {
      type: "photo" as const,
      url: unsplash.photo("1470229722913-7c0e2dbbafd3", 800, 800),
    },
  ].map((item, index) => ({
    id: `gallery-${user.handle}-${index}`,
    postId: `gallery-${index}`,
    type: item.type,
    url: item.url,
    createdAt: new Date(Date.now() - (index + 1) * 86_400_000).toISOString(),
  }));

  const allMedia = [...media, ...galleryExtras];
  const isSelf = user.id === mockCurrentUser.id;

  return {
    user,
    coverUrl: COVERS[user.handle] ?? COVERS.default!,
    bio: BIOS[user.handle] ?? "Sertanejo no sangue. Bem-vindo ao meu canto na Massa.",
    joinedAt: "2024-03-12T12:00:00.000Z",
    friendshipStatus: isSelf ? "self" : user.verified ? "friends" : "none",
    stats: {
      posts: Math.max(posts.length, 3),
      friends: 40 + ((user.displayName.length * 7) % 180),
      media: allMedia.length,
    },
    posts,
    media: allMedia,
  };
}
