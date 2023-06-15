import { useRecoilState, useRecoilValue } from "recoil";

import { IsRhythmPlaying ,selectRhythmType ,bpmNumberState} from "@/stores/RhythmState";
import { useMetronome } from './useMetronome';
import { useDrams } from "./useDrams";
import { mq, size } from "@/theme/cssFunctions"
import { css } from "@emotion/react"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const useRhythmPlayer = () =>{
  const [isPlay,setIsPlay] = useRecoilState<boolean>(IsRhythmPlaying);
  const rhythmType = useRecoilValue(selectRhythmType);
  const bpmNumber = useRecoilValue(bpmNumberState);
  const {onPlayMetronome,onStopMetronome,PrimaryMetronomeArea} = useMetronome()
  const {PrimaryDramsArea,onPlayDrams,onStopDrams} = useDrams();

  useEffect(()=>{
    onStop();
  }
  ,[rhythmType])


  const onPlay = ()=>{
    if(isPlay)return;
    setIsPlay(true);
    !rhythmType ? onPlayMetronome() : onPlayDrams();
  }

  const onStop = ()=>{
    if(!isPlay)return;
    setIsPlay(false);
    onStopMetronome(); 
    onStopDrams();
  }

  const MinRhythmPlayer = ()=>{
    return(
      <div css={[
        payingNavi,
        isPlay && isPlayingNavi 
      ]}>
      <div css={inner}>
        <Link to="rhythm" css={data}> 
          <p css={title}>{rhythmType ? 'Drams' : 'Metronome' }</p>
          <p css={bpm}>BPM : {bpmNumber}</p>
        </Link>
        <button type="button" css={[
          isPlay ? iconStop : iconPlay,
          icon,
        ]}
        onClick={()=> isPlay ? onStop() : onPlay() }
        ></button>
      </div>
    </div>
    )
  }
  
  const PrimaryRhythmPlayer = ()=>{
    return(
      <div>
      { !rhythmType 
      ?<PrimaryMetronomeArea/>
      :<PrimaryDramsArea/>}
      <button css={btnStyle} type="button" onClick={()=>{ !isPlay? onPlay() : onStop()}}>
        <span css={[
            btnIcon, 
            isPlay ? stop : play
            ]}></span>
      </button>
    </div>
    )
  }

  return {onPlay,onStop,MinRhythmPlayer,PrimaryRhythmPlayer}
}

const payingNavi = css`
  position:fixed;
  left: 0;
  bottom:calc(${size.vw(375, 58)} + env(safe-area-inset-bottom));
  width:100%;
  z-index:100;
  height:${size.vw(375,44)};
  background:rgba(3, 7 ,30 , .7);
  border-bottom: 1px solid var(--primary-border);
  backdrop-filter: blur(5px);
  font-family:var(--font-en);
  &::after{
    position:absolute;
    bottom:0;
    left: 0;
    content:'';
    width:100%;
    height:100%;
    border-bottom: 1px solid var(--color-light-blue);
    transform:scaleX(0);
    transition: transform .1s linear;
    transform-origin: left;
  }
  ${mq('s')}{
    bottom: ${size.rem(58)};
    height:${size.rem(44)}
  }
  ${mq('lg')}{
    bottom:0;
  }
`

const isPlayingNavi = css`
 &::after{
  transform:scaleX(100%)
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

const bpm = css`
${baseFonts}
`

const basePlayIcon = css`
  	clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 0 100%, 0 50%, 0 0);
`
const baseStopIcon = css`
    clip-path: polygon(0 ,0, 0 ,0);
`

const iconPlay = css`
  &::after{
    ${basePlayIcon};
    margin-left:2px;
    background: var(--color-white);

  }
`

const iconStop = css`
  &::after{
		${baseStopIcon};
    background: var(--color-light-blue);
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
    z-index:1;
    border-radius: 50%;
    @media (hover:hover) {
      transition:background .1s linear;
      &:hover{
        background: rgba(255, 255, 255, 0.4);
      }
   }
    &::after{
      position:absolute;
      height: 8px;
      width: 8px;
      top:auto;
      left:auto;
      display:block;
      content:'';
      z-index:2;
    }
`


const btnStyle = css`
  	width: 240px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-radius: 30px;
		background: var(--primary-gradient);
		border: 1px solid var(--color-gray);
		margin-left:auto ;
		margin-right: auto;
`
const btnIcon = css`
    height: 15px;
    width: 15px;
    background: var(--color-white);
    display: block;
    transition: clip-path .1s linear;
`

const play = css`
		${basePlayIcon}
`

const stop = css`
		${baseStopIcon}
`