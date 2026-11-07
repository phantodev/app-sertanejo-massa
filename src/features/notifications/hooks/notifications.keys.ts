export const notificationsKeys = {
  all: ["notifications"] as const,
  sections: () => [...notificationsKeys.all, "sections"] as const,
};
