import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/react";

import {  metronomeBeatSets ,dramsBeatSets} from "@/stores/BeatSets";
import {  selectMetronomeBeat ,selectRhythmType ,selectDramsBeat } from "@/stores/RhythmState";
import { mq, size } from "@/theme/cssFunctions";

export const SelectBeat = () => {
  const rhythmType = useRecoilValue(selectRhythmType);
  const mBeatSets = useRecoilValue(metronomeBeatSets);
  const [mSelectedBeat,setMSelectedBeat] = useRecoilState(selectMetronomeBeat);
  const dBeatSets = useRecoilValue(dramsBeatSets);
  const [dSelectedBeat,setDSelectedBeat] = useRecoilState(selectDramsBeat);

  return (
    <section css={wrap}>
        <div css={[selectWrap,!rhythmType?primaryWrap:secondaryWrap]}>
        {!rhythmType 
        ? <select css={select} value={mSelectedBeat} 
          onChange={(e)=>{setMSelectedBeat(Number(e.target.value));}}
          >
            {mBeatSets.map((b,index)=>
            <option key={index} value={index}>{b.name}</option>
            )}
          </select>
          : <select css={select}
           value={dSelectedBeat} 
          onChange={(e)=>{setDSelectedBeat(Number(e.target.value));}}
          >
          {dBeatSets.map((b,index)=>
            <option key={index} value={index}>{b.name}</option>
            )} 
          </select>
          }
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8.707"
            height="5.061"
            viewBox="0 0 8.707 5.061"
          >
            <path
              d="M507.038,294.746l-4,4-4-4"
              transform="translate(-498.684 -294.392)"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1"
            />
          </svg>
        </div>
    </section>
  );
};

const wrap = css`
  margin-top: ${size.vh(728, 20)};
  width: ${size.vw(375, 305)};
  max-width: ${size.rem(305)};
  margin-left: auto;
  margin-right: auto;
  ${mq("lg")} {
    max-width: ${size.rem(510)};
    margin-top: ${size.vh(1280, 55)};
  }
  `
const primaryWrap = css`
--select-width:4em;
${mq('lg')}{
  --select-width:6em;
}
`;

const secondaryWrap =css`
--select-width:10em;
${mq('lg')}{
  --select-width:14em;
}
`;

const selectWrap = css`
  position: relative;
  z-index:0;
  width: var(--select-width ,max-content);
  > svg {
    position: absolute;
    right: 0;
    z-index:-1;
    top: 45%;
    transform: translateX(-50%);
  }
`;

const select = css`
  color: var(--color-white);
  font-family: var(--font-en);
  letter-spacing: 0.2em;
  width: 100%;
  padding:.3em 1.4em .3em .3em;
  min-width: max-content;
  ${mq("lg")} {
    font-size: ${size.rem(18)};
  }
`;
