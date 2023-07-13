import { atom } from "recoil";

export const scaleSets = atom({
  key: "scaleSets",
  default: [
    {
      name: "クロマチック",
      value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      name: "メジャー",
      value: [0, 2, 4, 5, 7, 9, 11],
    },
    {
      name: "ナチュラルマイナー",
      value: [0, 2, 3, 5, 7, 8, 10],
    },
    {
      name: "ハーモニックマイナー",
      value: [0, 2, 3, 5, 7, 8, 11],
    },
    {
      name: "メロディックマイナー",
      value: [0, 2, 3, 5, 7, 9, 11],
    },
    {
      name: "メジャーペンタトニック",
      value: [0, 2, 4, 7, 9],
    },
    {
      name: "マイナーペンタトニック",
      value: [0, 3, 5, 7, 10],
    },
    {
      name: "ドリアン",
      value: [0, 2, 3, 5, 7, 9, 10],
    },
    {
      name: "フリジアン",
      value: [0, 1, 3, 5, 7, 8, 10],
    },
  ],
});
