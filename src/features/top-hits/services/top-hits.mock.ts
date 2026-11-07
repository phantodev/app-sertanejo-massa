import { unsplash } from "../../../shared/lib/unsplash.ts";
import { findMockUser, mockCurrentUser } from "../../session/services/session.mock.ts";
import type { ChartTrend, TopHitsCharts, TopSong, TopVideo } from "../types/top-hits.types.ts";

const COVER_IDS = [
  "1514525253161-7a46d19cd819",
  "1493225457124-a3eb161ffa5f",
  "1470225620780-dba8ba36b745",
  "1501386761578-eac5c94b800a",
  "1540039155733-5bb30b53aa14",
  "1511671782779-c97d3d27a1d4",
] as const;

const SONG_TITLES = [
  "Copo na Mão",
  "Estrada de Barro",
  "Viola no Salão",
  "Segura o Rodeio",
  "Chão de Goiás",
  "Baile da Roça",
  "Moda de Violeiro",
  "Fogo no Coração",
  "Minha Terra Me Chama",
  "Piseiro da Massa",
  "Saudade de Ocê",
  "Cavalo Selvagem",
  "Dois Corações",
  "Galope Noturno",
  "Raiz do Sertão",
  "Churrasco e Violão",
  "Lua de Rodeio",
  "Bão Demais",
  "Tributo ao Campo",
  "Amor de Sertanejo",
] as const;

const VIDEO_TITLES = [
  "Ao Vivo em Goiânia",
  "Clipe Oficial — Estrada",
  "Acústico na Roça",
  "DVD Massa no Peão",
  "Lyric Video",
  "Bastidores do Show",
  "Sessions Massa FM",
  "Rodeio Night Recap",
  "Making Of",
  "DVD Completo",
] as const;

const ARTIST_IDS = [
  "u-gold",
  "u-namu",
  "u-andre",
  "u-ljsecret",
  "u-safada10",
  "u-jemhot",
  "u-carlos",
  "u-sulsp",
] as const;

function pickTrend(rank: number): { trend: ChartTrend; trendDelta?: number } {
  if (rank <= 3) return { trend: "up", trendDelta: 4 - rank };
  if (rank === 4) return { trend: "new" };
  if (rank % 7 === 0) return { trend: "down", trendDelta: 1 };
  if (rank % 5 === 0) return { trend: "same" };
  return { trend: "up", trendDelta: 1 };
}

function buildSongs(): TopSong[] {
  return Array.from({ length: 50 }, (_, index) => {
    const rank = index + 1;
    const artistId = ARTIST_IDS[index % ARTIST_IDS.length]!;
    const artist = findMockUser(artistId) ?? mockCurrentUser;
    const titleBase = SONG_TITLES[index % SONG_TITLES.length]!;
    const { trend, trendDelta } = pickTrend(rank);

    return {
      id: `top-song-${rank}`,
      rank,
      title: rank <= 10 ? titleBase : `${titleBase} (versão ${rank})`,
      artistId: artist.id,
      artistName: artist.displayName,
      artistHandle: artist.handle,
      artistAvatarUrl: artist.avatarUrl,
      coverUrl: unsplash.photo(COVER_IDS[index % COVER_IDS.length]!, 200, 200),
      playCount: Math.round(2_800_000 / rank + 180_000 * (51 - rank)),
      durationSec: 162 + (index % 90),
      trend,
      trendDelta,
      weeksOnChart: Math.max(1, 18 - Math.floor(index / 3)),
      verified: index % 4 === 0,
    };
  });
}

function buildVideos(): TopVideo[] {
  return Array.from({ length: 50 }, (_, index) => {
    const rank = index + 1;
    const artistId = ARTIST_IDS[(index + 2) % ARTIST_IDS.length]!;
    const artist = findMockUser(artistId) ?? mockCurrentUser;
    const titleBase = VIDEO_TITLES[index % VIDEO_TITLES.length]!;
    const { trend, trendDelta } = pickTrend(rank);

    return {
      id: `top-video-${rank}`,
      rank,
      title: rank <= 8 ? titleBase : `${titleBase} #${rank}`,
      artistId: artist.id,
      artistName: artist.displayName,
      artistHandle: artist.handle,
      artistAvatarUrl: artist.avatarUrl,
      thumbnailUrl: unsplash.photo(COVER_IDS[(index + 1) % COVER_IDS.length]!, 320, 180),
      viewCount: Math.round(4_200_000 / rank + 220_000 * (51 - rank)),
      durationSec: 214 + (index % 120),
      trend,
      trendDelta,
      weeksOnChart: Math.max(1, 14 - Math.floor(index / 4)),
      verified: index % 5 === 0,
    };
  });
}

export function getMockTopHitsCharts(): TopHitsCharts {
  return {
    scope: { id: "brasil", label: "Brasil" },
    updatedAt: new Date().toISOString(),
    songs: buildSongs(),
    videos: buildVideos(),
  };
}
