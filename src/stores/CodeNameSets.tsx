import { atom } from "recoil";

export const codeNameSets = atom({
  key: 'codeNameSets',
  // jsonのファイル名と合わせてる
  default: [
    {
      name: "Major",
      value: 1
    },
    {
      name: "minor",
      value: 2
    },
    {
      name: "7",
      value: 3
    },
    {
      name: "Major7",
      value: 4
    },
    {
      name: "minor7",
      value: 5
    },
    { name: "add9",
      value:6 
    }],
})