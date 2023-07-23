import { useState } from "react";

export const useWakeLock = () =>{
  const [wakeLock ,setWakeLock] = useState<WakeLockSentinel|null>(null);

  const onWebLocke = async() =>{
      try {
        const req = await navigator.wakeLock.request('screen');
        setWakeLock(req)
      } catch (err) {
        return;
      }
  }
  const resetWebLock = ()=>{
    if (wakeLock !== null) {
      wakeLock.release()
        .then(() => {
          setWakeLock(null);
        })
    }
}
return {onWebLocke,resetWebLock}
}