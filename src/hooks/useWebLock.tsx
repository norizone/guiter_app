import { useRecoilState } from "recoil";

import { WakeLockState } from "@/stores/WakeLockState";

export const useWakeLock = () =>{
  const [wakeLockState,setWakeLockState] = useRecoilState(WakeLockState)
  const onWebLocke = async() =>{
      try {
        const req = await navigator.wakeLock.request('screen');
        setWakeLockState(req)
      } catch (err) {
        return;
      }
  }
  const resetWebLock = ()=>{
    if (wakeLockState !== null) {
      wakeLockState.release()
        .then(() => {
          setWakeLockState(null);
        })
    }
}
return {onWebLocke,resetWebLock}
}