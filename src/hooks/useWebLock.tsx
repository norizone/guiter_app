let wakeLockState:WakeLockSentinel|null = null;

export const useWakeLock = () =>{
  const onWebLocke = async() =>{
      try {
        wakeLockState = await navigator.wakeLock.request('screen');
        console.log(wakeLockState)
      } catch (err) {
        console.log(err)
        return;
      }
  }
  const resetWebLock = ()=>{
    if (wakeLockState !== null) {
      console.log('chan')
       wakeLockState.release()
        .then(() => {
          wakeLockState = null;
        })
    }
}
return {onWebLocke,resetWebLock}
}