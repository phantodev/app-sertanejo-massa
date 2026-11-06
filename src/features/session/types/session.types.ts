export type User = {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  verified: boolean;
  city: string;
  state: string;
};

export type CurrentUser = User & {
  accountLabel: string;
};
