import { useState } from "react";

export const useWakeLock = () =>{
  const [wakeLock ,setWakeLock] = useState<WakeLockSentinel>();

  const onWebLocke = async() =>{
      try {
        const req = await navigator.wakeLock.request('screen');
        setWakeLock(req)
      } catch (err) {
        return;
      }
  }
  const resetWebLock = ()=>{
    wakeLock && wakeLock.release();
}
return {onWebLocke,resetWebLock}
}