let wakeLockState:WakeLockSentinel|null = null;

export const useWakeLock = () =>{
  const onWebLocke = async() =>{
      try {
        wakeLockState = await navigator.wakeLock.request('screen');
      } catch (err) {
        return;
      }
  }
  const resetWebLock = ()=>{
    console.log(wakeLockState)
    if (wakeLockState !== null) {
       wakeLockState.release()
        .then(() => {
          wakeLockState = null;
        })
    }
}
return {onWebLocke,resetWebLock}
}