import { unsplash } from "../../../shared/lib/unsplash.ts";
import type { LatestFeed, LatestMediaItem } from "../types/latest.types.ts";

/** IDs já usados no app e validados (evita thumbs 404 no grid). */
const MEDIA_IDS = [
  "1514525253161-7a46d19cd819",
  "1493225457124-a3eb161ffa5f",
  "1470225620780-dba8ba36b745",
  "1501386761578-eac5c94b800a",
  "1540039155733-5bb30b53aa14",
  "1511671782779-c97d3d27a1d4",
  "1492684223066-81342ee5ff30",
  "1501281668745-f7f57925c3b4",
  "1558981403-c5f9899a28bc",
  "1470229722913-7c0e2dbbafd3",
  "1460723237483-7a6dc9d0b212",
  "1487180144351-b8472da7d491",
  "1429962714451-bb934ecdc4ec",
  "1555939594-58d7cb561ad1",
  "1529156069898-49953e39b3ac",
  "1519741497674-611481863552",
] as const;

function photo(
  id: string,
  imageIndex: number,
  author: { handle: string; name: string },
  likeCount: number,
  likedByMe = false,
): LatestMediaItem {
  const imageId = MEDIA_IDS[imageIndex % MEDIA_IDS.length]!;
  return {
    id,
    kind: "photo",
    mediaUrl: unsplash.photo(imageId, 640, 640),
    authorHandle: author.handle,
    authorName: author.name,
    likeCount,
    likedByMe,
    postedAt: new Date(Date.now() - Number(id.replace(/\D/g, "") || "1") * 3_600_000).toISOString(),
  };
}

function video(
  id: string,
  imageIndex: number,
  author: { handle: string; name: string },
  likeCount: number,
  durationSec: number,
  likedByMe = false,
): LatestMediaItem {
  const imageId = MEDIA_IDS[imageIndex % MEDIA_IDS.length]!;
  return {
    id,
    kind: "video",
    mediaUrl: unsplash.photo(imageId, 640, 640),
    authorHandle: author.handle,
    authorName: author.name,
    likeCount,
    likedByMe,
    durationSec,
    postedAt: new Date(Date.now() - Number(id.replace(/\D/g, "") || "1") * 5_400_000).toISOString(),
  };
}

const a = {
  namu: { handle: "namu", name: "Namu" },
  andre: { handle: "andre-daniel", name: "Andre Daniel" },
  gold: { handle: "gold", name: "GOLD" },
  lj: { handle: "ljsecret", name: "LJsecret" },
  carlos: { handle: "carlos-aline", name: "Carlos_Aline" },
  jem: { handle: "jemhot", name: "jemhot" },
};

const mockPhotos: LatestMediaItem[] = [
  photo("p01", 0, a.namu, 128, true),
  photo("p02", 1, a.andre, 86),
  photo("p03", 2, a.gold, 214),
  photo("p04", 3, a.lj, 54),
  photo("p05", 4, a.carlos, 302, true),
  photo("p06", 5, a.jem, 41),
  photo("p07", 6, a.namu, 167),
  photo("p08", 7, a.andre, 98),
  photo("p09", 8, a.gold, 73),
  photo("p10", 9, a.lj, 155),
  photo("p11", 10, a.carlos, 88),
  photo("p12", 11, a.jem, 201),
  photo("p13", 12, a.namu, 44),
  photo("p14", 13, a.andre, 119),
  photo("p15", 14, a.gold, 266, true),
  photo("p16", 15, a.lj, 37),
  photo("p17", 0, a.carlos, 92),
  photo("p18", 1, a.jem, 178),
];

const mockVideos: LatestMediaItem[] = [
  video("v01", 2, a.gold, 512, 42, true),
  video("v02", 3, a.namu, 143, 28),
  video("v03", 4, a.andre, 287, 65),
  video("v04", 5, a.lj, 76, 19),
  video("v05", 6, a.carlos, 198, 54),
  video("v06", 7, a.jem, 334, 88),
  video("v07", 8, a.namu, 91, 31),
  video("v08", 9, a.gold, 421, 120, true),
  video("v09", 10, a.andre, 156, 47),
  video("v10", 11, a.lj, 67, 22),
  video("v11", 12, a.carlos, 245, 73),
  video("v12", 13, a.jem, 129, 36),
];

export function getMockLatestFeed(): LatestFeed {
  return {
    photos: mockPhotos,
    videos: mockVideos,
    updatedAt: new Date().toISOString(),
  };
}
