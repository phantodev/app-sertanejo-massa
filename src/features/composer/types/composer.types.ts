export type ComposerDraft = {
  text: string;
  hasMedia: boolean;
  hasLocation: boolean;
};

export type ComposerActionId = "photos" | "video" | "location" | "audio";

export type ComposerAction = {
  id: ComposerActionId;
  label: string;
};
