import { atom } from "recoil";

export const IsModalOpen = atom<boolean>({
  key: "IsModalOpen",
  default: false,
});

export const ScrollPosition = atom<number>({
  key:"ScrollPosition",
  default:0
});