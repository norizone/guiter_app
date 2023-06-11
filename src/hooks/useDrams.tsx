import { createRef, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Tone from "tone";
import { css } from "@emotion/react";

import { mq, size } from "@/theme/cssFunctions";
import { bpmNumberState} from "@/stores/RhythmState";
import { dramsState } from "@/stores/DramsState";

import type {RefObject} from "react"

// const cats = ['🐈','🐈‍⬛','🐆','']

export const useDrams = () => {
  // const [isCat,setIsCat] = useState(false)
  const [dramsValues,setDramsValues] = useRecoilState(dramsState);
  const countRef = useRef<RefObject<HTMLLIElement>[]>([]);
  const countParentRef = useRef<HTMLUListElement>(null)
  const bpmNumber = useRecoilValue(bpmNumberState);
  const playValues = useRef(dramsValues)
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
    dramsValues.map((_,key)=>{
      countRef.current[key] = createRef<HTMLLIElement>()
    })
  },[dramsValues])

  useEffect(()=>{
    Tone.Transport.bpm.value = bpmNumber
  },[bpmNumber])

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

  const onPadClick = (event:React.MouseEvent<HTMLButtonElement> , dramsIndex:number , patternIndex:number 
    )=>{
      const {current} = playValues
      const prevPatternValue = current[dramsIndex].pattern[patternIndex]
      const target = event.currentTarget;
      const newValue:0|1 = !prevPatternValue ? 1 : 0;
      prevPatternValue===0 ? target.classList.add('active') : target.classList.remove('active');
      const newCurrent = [
        ...current.slice(0,dramsIndex),{
          ...current[dramsIndex],
          pattern:[
            ...current[dramsIndex].pattern.slice(0,patternIndex),
            newValue ,
            ...current[dramsIndex].pattern.slice(patternIndex+1)
          ]
        },
        ...current.slice(dramsIndex+1)
      ];
      playValues.current = newCurrent
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
    setDramsValues(playValues.current);
  }

  const PrimaryDramsArea = () => {
    return (
      <div css={dramsWrap}>
        <ul css={dramsLabels}>
          {playValues.current.map((d, index) => (
            <li css={[dramsLabel]} key={index}>
              {d.name}
            </li>
          ))}
        </ul>
        <ul css={padWrap} ref={countParentRef}>
          {playValues.current.map((d, dIndex) => (
            <li ref={countRef.current[dIndex]}
            key={dIndex} css={[
              css`
              --start-gradient: ${dIndex * .06} ;
              --end-gradient:${(dIndex + 1) * .06};
              `,
              pads,
              ]}>
              {d.pattern.map((p, pIndex) => (
                <button key={pIndex} css={[
                  pad, 
                  pIndex === 7 && denominator,
                ]}
                className={p ? 'active' :'' }
                onClick={(e)=>onPadClick(e,dIndex ,pIndex )}
                ></button>
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

  return { onStopDrams,onPlayDrams, PrimaryDramsArea,};
};

//--- style ----
const dramsWrap = css`
  margin-top: ${size.vh(728, 30)};
  margin-bottom: ${size.vh(728, 35)};
  margin-right: auto;
  margin-left: auto;
  padding-left:1em;
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
  border-left: 1px solid var(--primary-border);
`;

const dramsLabel = css`
  height: ${size.vw(375, 43)};
  font-family: var(--font-en);
  font-size: ${size.vw(375, 14)};
  display: flex;
  align-items: center;
  min-width:4em;
  padding-left: 0.5em;
  border-bottom: 1px solid var(--primary-border);
  ${mq("s")} {
    height: ${size.rem(43)};
    font-size: ${size.rem(14)};
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
  --btn-color : var(--primary-border);
  width: ${size.vw(375, 42)};
  padding: ${size.vw(375, 6)} 0;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  border-right: 1px solid var(--primary-border);
  ${mq("s")} {
    width: ${size.rem(42)};
    padding: ${size.rem(6)} 0;
  }
  &.denominator {
    border-right: 1px solid #fff;
  }
  &::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    background: var(--btn-color);
    height: ${size.vw(375, 30)};
    width: ${size.vw(375, 30)};
    display: block;
    content: "";
    border-radius: 5px;
    box-shadow: 0px 0px 12px 2px rgba(0,0,0,0.4) inset;
    overflow:hidden;
    ${mq("s")} {
      width: ${size.rem(30)};
      height: ${size.rem(30)};
    }
  }
  &.active{
    --btn-color : var(--color-blue);
  }
  &.now {
    --btn-color : var(--color-light-blue);
  }
`;
const active = css`
    --btn-color : var(--color-blue);
`;

const numbers = css`
  display: flex;
  width: max-content;
  border-bottom: 1px solid var(--primary-border);
  border-top: 1px solid var(--primary-border);
  border-right: 1px solid var(--color-white);
`;
const number = css`
  width: ${size.vw(375, 42)};
  text-align: center;
  border-right: 1px solid var(--primary-border);
  ${mq("s")} {
    width: ${size.rem(42)};
  }
`;

const denominator = css`
  border-right: 1px solid var(--color-white);
` 

