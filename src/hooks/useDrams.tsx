import { createRef, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Tone from "tone";
import { css } from "@emotion/react";

import { mq, size } from "@/theme/cssFunctions";
import { bpmNumberState} from "@/stores/RhythmState";
import { dramsState } from "@/stores/DramsState";

import type {RefObject} from "react"

// const cats = ['🐈','🐈‍⬛','🐆','']

/* useRefの初期値にdramsValuesを入れたい そのあたり調整する */
export const useDrams = () => {
  const [isCat,setIsCat] = useState(false)
  const [dramsValues,setDramsValues] = useRecoilState(dramsState);
  const countRef = useRef<RefObject<HTMLLIElement>[]>([]);
  const countParentRef = useRef<HTMLUListElement>(null)
  const bpmNumber = useRecoilValue(bpmNumberState);
  const playValues = useRef<any>()
  const [drams] = useState<Tone.Sampler>(
    new Tone.Sampler(
      {
        C1:"bass.mp3",
        C2:"tam.mp3",
        C3:"sn.mp3",
        C4:"hicc.mp3",
        C5:"sin.mp3",
      },{
        baseUrl:"/sound/",
        attack:0.1,
        release:.9
    }).toDestination()
  )

  useEffect(()=>{
    playValues.current=dramsValues
  },[])

  useEffect(()=>{
    dramsValues.map((_,key)=>{
      countRef.current[key] = createRef<HTMLLIElement>()
    })
  },[dramsValues])

  useEffect(()=>{
    Tone.Transport.bpm.value = bpmNumber
  },[bpmNumber])

  // useEffect(()=>{
  //   const newValue = dramsBeats[selectedMetroBeat].value;
  //   newValue&&newValue.length>0&&setThisBeat(newValue)
  // },[dramsBeats,selectedMetroBeat])

  const handlerCounterStyle = (thisCount:number,index:number,isSound:0|1)=>{
    if( !countRef.current[index].current ||!countRef.current[index].current?.children)return;
    const thisRef = countRef.current[index].current ?? null
    const prevCount = thisCount - 1 < 0  ? 15 : thisCount -1;
    thisRef?.children[prevCount].classList.remove('now');
    isSound&& thisRef?.children[thisCount].classList.add('now');
    if(index===0 && countParentRef.current){
      const onePadWidth = thisRef?.children[0].clientWidth ?? 60
      countParentRef.current.scrollTo({
        top: 0,
        left: onePadWidth * thisCount,
        behavior: "auto"})
    }
  }

  // useEffect(()=>{
  //   const soundFilter = new Tone.Filter({
  //     type:"lowpass",
  //     frequency : 350 ,
  //     rolloff : -12 ,
  //     Q : 10 ,
  //     gain : 1500000,
  //   }).toDestination();
  //   // drams.connect(soundFilter)
  // },[drams])

  const onPadClick = (patternValue:0|1 , dramsIndex:number , patternIndex:number)=>{
      const newDrams = [...playValues.current];
      const newPattern = [...newDrams[dramsIndex].pattern];
      newPattern[patternIndex] = !patternValue ? 1 : 0;
      newDrams[dramsIndex] = { ...newDrams[dramsIndex], pattern: newPattern };
      // この値をuseFerにするか?
      playValues.current = newDrams
  }

  const onPlayDrams = () =>{
    if(drams.loaded){
      let thisCount = 0;
      Tone.Transport.scheduleRepeat((time)=>{
        playValues.current.map((v,index)=>{
          handlerCounterStyle(thisCount,index,v.pattern[thisCount])
          if(v.pattern[thisCount]){
            drams.triggerAttackRelease(v.midiKey, "32n" , time) 
          }
        })
        thisCount++;
        thisCount >= 16 && (thisCount = 0);
      },'8n')
      Tone.Transport.start();
    }
  }

  const onStopDrams = () =>{
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }

  const PrimaryDramsArea = () => {
    return (
      <div css={dramsWrap}>
        <ul css={dramsLabels}>
          {playValues.current?.map((d, index) => (
            <li css={[dramsLabel]} key={index}>
              {d.name}
            </li>
          ))}
        </ul>
        <ul css={padWrap} ref={countParentRef}>
          {playValues.current?.map((d, dIndex) => (
            <li ref={countRef.current[dIndex]}
            key={dIndex} css={[
              css`
              --start-gradient: ${dIndex * .06} ;
              --end-gradient:${(dIndex + 1) * .06};
              `,
              pads,
              ]}>
              {d.pattern.map((p, pIndex) => (
                <span key={pIndex} css={[
                  pad, p && active,
                  pIndex === 7 && denominator
                ]}
                onClick={()=>onPadClick(p,dIndex,pIndex)}
                ></span>
              ))}
            </li>
          ))}
        <li css={numbers}>
          {Array(16).fill('').map((_,index)=>(
            <span key={index} css={[
              number,
              index === 7 && denominator
            ]}>{index < 8 ? index+1 : index - 8 + 1 }</span>
          )
          )}
        </li>
        </ul>
      </div>
    );
  };

  return {
    // onPlayDrams,onStopDrams,
    onPlayDrams, PrimaryDramsArea,
  };
};

//--- style ----
const dramsWrap = css`
  margin-top: ${size.vh(728, 30)};
  margin-bottom: ${size.vh(728, 35)};
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  display: flex;
  flex-flow: row nowrap;
  ${mq("lg")} {
    width: max-content;
    margin-right: auto;
    margin-left: auto;
  }
`;

const dramsLabels = css`
  border-top: 1px solid var(--primary-border);
  border-bottom: 1px solid var(--primary-border);
  border-right: 1px solid var(--primary-border);
`;

const dramsLabel = css`
  height: ${size.vw(375, 49)};
  font-family: var(--font-en);
  font-size: ${size.vw(375, 16)};
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--primary-border);
  ${mq("s")} {
    height: ${size.rem(49)};
    font-size: ${size.rem(16)};
  }
`;

const padWrap = css`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

const pads = css`
  width: max-content;
  display: flex;
  border-top: 1px solid var(--primary-border);
  border-right: 1px solid var(--color-white);
  background-image: linear-gradient(0deg, rgba(73,102,125,var(--end-gradient,1)) 0%, rgba(73,102,125,var(--start-gradient,0)) 100%);
`;

const pad = css`
  width: ${size.vw(375, 52)};
  padding: ${size.vw(375, 12)} 0;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  border-right: 1px solid var(--primary-border);
  ${mq("s")} {
    width: ${size.rem(52)};
    padding: ${size.rem(12)} 0;
  }
  &.denominator {
    border-right: 1px solid #fff;
  }
  &::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    background: var(--primary-border);
    width: ${size.vw(375, 24)};
    display: block;
    content: "";
    border-radius: 5px;
    height: ${size.vw(375, 24)};
    box-shadow:0px 0px 2px 1px rgba(0,0,0,.3) inset;
    ${mq("s")} {
      width: ${size.rem(24)};
      height: ${size.rem(24)};
    }
  }
  &.now {
    &::before {
      background: var(--color-light-blue);
    }
  }
`;
const active = css`
  &::before {
    background: var(--color-blue);
  }
`;

const numbers = css`
  display: flex;
  width: max-content;
  border-bottom: 1px solid var(--primary-border);
  border-top: 1px solid var(--primary-border);
  border-right: 1px solid var(--color-white);
`;
const number = css`
  width: ${size.vw(375, 52)};
  text-align: center;
  border-right: 1px solid var(--primary-border);
  ${mq("s")} {
    width: ${size.rem(52)};
  }
`;

const denominator = css`
  border-right: 1px solid var(--color-white);
` 

