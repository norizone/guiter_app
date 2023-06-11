import { useRecoilState, useRecoilValue } from "recoil";

import { IsRhythmPlaying ,selectRhythmType ,bpmNumberState} from "@/stores/RhythmState";
import { useMetronome } from './useMetronome';
import { useDrams } from "./useDrams";


export const useRhythmPlayer = () =>{
  const [isPlay,setIsPlay] = useRecoilState<boolean>(IsRhythmPlaying);
  const rhythmType = useRecoilValue(selectRhythmType);
  const bpmNumber = useRecoilValue(bpmNumberState);
  const {onPlayMetronome,onStopMetronome,PrimaryMetronomeArea} = useMetronome()
  const {PrimaryDramsArea,onPlayDrams} = useDrams();

  // useEffect(()=>{
  //   if(!isPlay)return;
  //   thisBeat.length > 0 &&
  //     onStop();
  //     onPlay();
  // },[thisBeat,isPlay,rhythmType])

  const onPlay = ()=>{
    if(isPlay)return;
    setIsPlay(true);
    !rhythmType ? onPlayMetronome() : onPlayDrams();
  }

  const onStop = ()=>{
    if(!isPlay)return;
    setIsPlay(false);
    onStopMetronome();
  }

  const MinRhythmPlayer = ()=>{
    return(
      isPlay ? <></> : null
    )
  }

  const PrimaryRhythmPlayer = ()=>{
    return(
      !rhythmType 
      ?<PrimaryMetronomeArea/>
      :<PrimaryDramsArea/>
    )
  }

  return {onPlay,onStop,MinRhythmPlayer,PrimaryRhythmPlayer}
}