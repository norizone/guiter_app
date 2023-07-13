import { atom } from "recoil";

export const codeSelectedKey = atom<number>({
  key: "codeSelectedKey",
  default: 0,
});

export const codeSelectedCode = atom<number>({
  key: "codeSelectedCode",
  default: 0,
});
