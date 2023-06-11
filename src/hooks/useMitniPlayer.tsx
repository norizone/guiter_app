import { mq, size } from "@/theme/cssFunctions"
import { css } from "@emotion/react"
// import { motion } from "framer-motion"
import { useRecoilValue } from "recoil";

import { IsRhythmPlaying  } from "@/stores/RhythmState";
import { useRhythmPlayer } from "@/hooks/useRhythmPlayer";
import { selectDramsBeat, selectMetronomeBeat ,selectRhythmType } from "@/stores/RhythmState";
import { dramsBeatSets, metronomeBeatSets } from "@/stores/BeatSets";
import { bpmNumberState } from "@/stores/RhythmState"


export const useMiniPlayer = ()=>{
  const isPlay = useRecoilValue(IsRhythmPlaying);
  const hasBeatType = useRecoilValue(selectRhythmType);
  const selectMBeat = useRecoilValue(selectMetronomeBeat);
  const mBeatSets = useRecoilValue(metronomeBeatSets);
  const bpmNumber = useRecoilValue(bpmNumberState);
  const { onPlay, onStop } = useRhythmPlayer();

  const MiniPlayer = () =>{
    return (
      <div css={payingNavi}>
      <div css={inner}>
        <div css={data}> 
          <p css={title}>{hasBeatType ? 'Drams' : 'Metronome' }</p>
          {!hasBeatType && 
          <p css={beat}>{mBeatSets[selectMBeat].name}</p>
          }
          <p css={bpm}>BPM : {bpmNumber}</p>
        </div>
        <button type="button" css={[
          isPlay ? iconStop : iconPlay,
          icon,
        ]}
        onClick={()=> isPlay ? onStop() : onPlay() }
        ></button>
      </div>
    </div>
    );
  }

  return {MiniPlayer}
}

const payingNavi = css`
  position:fixed;
  left: 0;
  bottom:${size.vw(375, 58)};
  width:100%;
  z-index:100;
  height:${size.vw(375,40)};
  background:rgba(3, 7 ,30 , .7);
  border-bottom: 1px solid var(--color-light-blue);
  backdrop-filter: blur(5px);
  font-family:var(--font-en);
  ${mq('s')}{
    bottom: ${size.rem(58)};
    height:${size.rem(40)}
  }
  ${mq('lg')}{
    bottom:0;
  }
`
const inner = css`
    width: ${size.vw(375, 280)};
    margin-inline: auto;
    display:flex;
    flex-flow:row nowrap;
    align-items:center;
    justify-content:space-between;
    max-width:420px;
    height: 100%;
`
const data = css`
  display: flex;
  flex-flow:row nowrap;
  column-gap: 2em;
  align-items:end;
`

const title = css`
  font-size:${size.vw(375,16)};
  ${mq('s')}{
    font-size:${size.rem(16)};
  }
`

const baseFonts = css`
   font-size:${size.vw(375,12)};
  ${mq('s')}{
    font-size:${size.rem(12)};
  }
`

const beat = css`
${baseFonts}
`

const bpm = css`
${baseFonts}
`

const iconPlay = css`
  &::after{
		clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 0 100%, 0 50%, 0 0);
    margin-left:2px;
  }
`

const iconStop = css`
  &::after{
		clip-path: polygon(0 ,0, 0 ,0);
  }
`

const icon = css`
    display: flex;
    align-items:center;
    justify-content:center;
    transition: clip-path .1s linear;
    position: relative;
    background: rgba(255, 255, 255, 0.2);
    width: 28px;
    height:28px; 
    border-radius: 50%;
    @media (hover:hover) {
      transition:background .1s linear;
      &:hover{
        background: rgba(255, 255, 255, 0.4);
      }
   }
    &::after{
      position:absolute;
      background: var(--color-white);
      height: 10px;
      width: 10px;
      top:auto;
      left:auto;
      display:block;
      content:'';
      z-index:1;
    }
`


