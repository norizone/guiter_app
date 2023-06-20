import {  useEffect, useRef, useState } from 'react';
import { useRecoilValue ,useRecoilState } from 'recoil';
import * as Tone  from 'tone';
import { css } from "@emotion/react";

import { mq, size } from "@/theme/cssFunctions";
import { IsRhythmPlaying,bpmNumberState, selectMetronomeBeat } from '@/stores/RhythmState';
import { metronomeBeatSets } from '@/stores/BeatSets';

export const useMetronome = () =>{
  const countRef = useRef<HTMLDivElement>(null)
  const [isPlay,setIsPlay] = useRecoilState<boolean>(IsRhythmPlaying)
  const bpmNumber = useRecoilValue(bpmNumberState);
  const selectedMetroBeat = useRecoilValue(selectMetronomeBeat); 
  const metronomeBeats = useRecoilValue(metronomeBeatSets);
  const [eventId,setEventId] = useState(0);
  const [thisBeat,setThisBeat] = useState(metronomeBeats[selectedMetroBeat].value);
  const [metronome] = useState<Tone.Synth>(
    new Tone.Synth({
      oscillator: {
        modulationFrequency: .5
      },
      envelope: {
        attack: 0,
        decay: 0,
        sustain: 0.1,
        release: 0.1,
      }
    }).toDestination()
  )
   
  useEffect(()=>{
    Tone.Transport.bpm.value = bpmNumber
  },[bpmNumber])

  useEffect(()=>{
    const newValue = metronomeBeats[selectedMetroBeat].value;
    if(newValue === thisBeat)return
    newValue&&newValue.length>0&&setThisBeat(newValue)
    if(!isPlay)return;
    onStopMetronome();
    setIsPlay(false);
  },[metronomeBeats,selectedMetroBeat,thisBeat])

  const handlerCounterStyle = (thisCount:number)=>{
    if(!countRef || !countRef.current?.children) return
      const children = countRef.current.children
      const prevCount = thisCount -1 < 0 ? thisBeat.length -1 : thisCount -1; 
      children[prevCount].classList.remove('active');
      thisBeat[thisCount] === 2 
      ? children[thisCount].classList.add('root') 
      : children[thisCount].classList.add('active');
      thisBeat[thisCount] === 1 && children[prevCount].classList.remove('root');
  }

  const onPlayMetronome = () =>{
    let thisCount = 0;
    Tone.Transport.clear(eventId)
    setEventId(
      Tone.Transport.scheduleRepeat((time)=>{
        thisBeat[thisCount] === 2 && metronome.triggerAttackRelease("A5", "32n" , time) 
        thisBeat[thisCount] === 1 && metronome.triggerAttackRelease("C5", "32n" ,time)
        handlerCounterStyle(thisCount)
        thisCount++;
        thisCount > thisBeat.length -1 && (thisCount =0);
      },'4n')
      )
      Tone.Transport.start();
  }

  const onStopMetronome = () =>{
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }

  const PrimaryMetronomeArea = () => {
    return(
      <div css={mCountWrap} ref={countRef}>
      {metronomeBeats[selectedMetroBeat].value.map((_,index)=>
      <span css={[
        mCount,
      ]} key={index}></span>
      )}
      </div>
    )
  }
  return {onPlayMetronome,onStopMetronome,PrimaryMetronomeArea}
}


const mCountWrap = css`
  width: ${size.vw(375, 240)};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: ${size.vh(728, 52)};
  margin-bottom: ${size.vh(728, 65)};
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  ${mq("lg")} {
    width: max-content;
  }
`;

const mCount = css`
  height: ${size.vw(375, 30)};
  width: ${size.vw(375, 30)};
  background: var(--primary-border);
  transition: background 0.2s;
  border-radius: 50%;
  ${mq("s")} {
    height: ${size.rem(30)};
    width: ${size.rem(30)};
  }
  ${mq("lg")} {
    height: ${size.rem(36)};
    width: ${size.rem(36)};
  }

  &:not(:first-of-type) {
    margin-left: ${size.vw(375, 40)};
    ${mq("s")} {
      margin-left: ${size.rem(40)};
    }
    ${mq("lg")} {
      margin-left: ${size.rem(48)};
    }
  }
  &.active{
    background: var(--color-white);
  }
  &.root{
    background: var(--color-light-blue);
  }
`;
