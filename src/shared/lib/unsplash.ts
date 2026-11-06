const UNSPLASH = "https://images.unsplash.com";

/** URLs Unsplash estáveis para mocks (substituir por assets reais depois). */
export const unsplash = {
  avatar: (id: string, size = 160) =>
    `${UNSPLASH}/photo-${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`,
  photo: (id: string, width = 800, height = 600) =>
    `${UNSPLASH}/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`,
} as const;
