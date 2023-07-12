import { atom } from "recoil";

export const tuningSets = atom({
  key: "tuningSets",
  default: [
    {
      name: "レギュラー",
      value: [4, 11, 7, 2, 9, 4], //デフォルト値に使用するのの
    },
    {
      name: "半音下げ",
      value: [3, 10, 6, 1, 8, 3],
    },
    {
      name: "ドロップD",
      value: [4, 11, 7, 2, 9, 2],
    },
    {
      name: "ベース / レギュラー",
      value: [7, 2, 9, 4],
    },
    {
      name: "ベース / 半音下げ",
      value: [6, 1, 8, 3],
    },
    {
      name: "ベース / ドロップD",
      value: [7, 2, 9, 2],
    },
  ],
});
