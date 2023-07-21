import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export type DramsState = {
  midiKey: string;
  name: string;
  pattern: Array<0 | 1>;
  attack: number; // 0.1 - 1.0
  release: number; // 1 - 10
  volume: number; // 0 - 1.0 0の場合ミュート
  sound: string;
};

const defaultValue: Array<DramsState> = [
  {
    midiKey: "C1",
    name: "Bass",
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    attack: 0.1,
    release: 1,
    volume: 0.5,
    sound: "bass.mp3",
  },
  {
    midiKey: "C2",
    name: "Tam",
    pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    attack: 1,
    release: 1,
    volume: 0.5,
    sound: "tam.mp3",
  },
  {
    midiKey: "C3",
    name: "Snr",
    pattern: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    attack: 0.4,
    release: 1,
    volume: 0.5,
    sound: "sn.mp3",
  },
  {
    midiKey: "C4",
    name: "HHAT",
    pattern: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    attack: 0.1,
    release: 10,
    volume: 0.5,
    sound: "hicc.mp3",
  },
  {
    midiKey: "C5",
    name: "Sin",
    pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    attack: 0.1,
    release: 10,
    volume: 0.5,
    sound: "sin.mp3",
  },
];

export const defaultDramsState = atom<Array<DramsState>>({
  key: "defaultDramsState",
  default: defaultValue,
});

const { persistAtom } = recoilPersist({
  key: "dramsPersist",
  storage: localStorage,
});

export const dramsState = atom<Array<DramsState>>({
  key: "dramsState",
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const composeDramsState = selector({
  key: "composeDramsState",
  get: ({ get }) => {
    const defaultValue = get(defaultDramsState);
    const userState = get(dramsState);
    // 正常にlocalStorageの値が使えるか
    if (
      defaultValue.every((dv, index) =>
        Object.keys(dv).every((el, i) => el === Object.keys(userState[index])[i])
      )
    ) {
      return userState;
    } else {
      localStorage.removeItem('dramsPersist');
      return defaultValue;
    }
  },
  set: ({ set }, newValue) => set(dramsState, newValue),
});
