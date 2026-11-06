export const storiesKeys = {
  all: ["stories"] as const,
  list: () => [...storiesKeys.all, "list"] as const,
};
