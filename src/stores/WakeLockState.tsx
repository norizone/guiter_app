import { atom } from "recoil";

export const WakeLockState = atom<WakeLockSentinel|null>({
  key: "WakeLockState",
  default: null,
});