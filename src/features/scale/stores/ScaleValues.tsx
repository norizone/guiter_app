import { atom } from "recoil";

export const scaleSelectedScale = atom<number>({
  key: "scaleSelectedScale",
  default: 5,
});

export const scaleSelectedKey = atom({
  key: "scaleSelectedKey",
  default: 0,
});

export const scaleSelectedTuning = atom({
  key: "scaleSelectedTuning",
  default: 0,
});
