import { atom } from "recoil";

export const noteKeySets = atom({
  key: "noteKeySets",
  default: [
    {
      name: "C",
      value: 0,
    },
    {
      name: "C#",
      value: 1,
    },
    {
      name: "D",
      value: 2,
    },
    {
      name: "D#",
      value: 3,
    },
    {
      name: "E",
      value: 4,
    },
    {
      name: "F",
      value: 5,
    },
    {
      name: "F#",
      value: 6,
    },
    {
      name: "G",
      value: 7,
    },
    {
      name: "G#",
      value: 8,
    },
    {
      name: "A",
      value: 9,
    },
    {
      name: "A#",
      value: 10,
    },
    {
      name: "B",
      value: 11,
    },
  ],
});
