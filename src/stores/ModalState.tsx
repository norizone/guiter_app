import { atom } from "recoil";

export const IsModalOpen = atom<boolean>({
  key: "IsModalOpen",
  default: false,
});
