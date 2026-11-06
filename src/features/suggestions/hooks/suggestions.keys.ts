export const suggestionsKeys = {
  all: ["suggestions"] as const,
  list: () => [...suggestionsKeys.all, "list"] as const,
};
