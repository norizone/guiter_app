import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "rhythmTypePersist",
  storage: sessionStorage,
});

export const IsRhythmPlaying = atom<boolean>({
  key: "IsRhythmPlaying",
  default: false,
});

export const bpmNumberState = atom<number>({
  key: "bpmNumberState",
  default: 120,
});

export const selectRhythmType = atom<0 | 1>({
  key: "selectRhythmType",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const selectMetronomeBeat = atom<number>({
  key: "selectMetronomeBeat",
  default: 0,
});

export const selectDramsBeat = atom<number>({
  key: "selectDramsBeat",
  default: 1,
});
