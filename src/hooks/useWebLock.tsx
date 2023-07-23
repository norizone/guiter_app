let wakeLockState:WakeLockSentinel|null = null;

export const useWakeLock = () =>{
  const onWebLocke = async() =>{
      try {
        wakeLockState = await navigator.wakeLock.request('screen');
        console.log(wakeLockState)
      } catch (err) {
        return;
      }
  }
  const resetWebLock = ()=>{
    if (wakeLockState !== null) {
       wakeLockState.release()
        .then(() => {
          wakeLockState = null;
        })
    }
}
return {onWebLocke,resetWebLock}
}