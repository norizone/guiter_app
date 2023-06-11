import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/react";

import { dramsBeatSets, metronomeBeatSets } from "@/stores/BeatSets";
import { selectDramsBeat, selectMetronomeBeat ,selectRhythmType } from "@/stores/RhythmState";
import { mq, size } from "@/theme/cssFunctions";

export const SelectBeat = () => {
  const rhythmType = useRecoilValue(selectRhythmType);
  const mBeatSets = useRecoilValue(metronomeBeatSets);
  const [mSelectedBeat,setMSelectedBeat] = useRecoilState(selectMetronomeBeat);
  const dBeatSets = useRecoilValue(dramsBeatSets);
  const [dSelectedBeat,setDSelectedBeat] = useRecoilState(selectDramsBeat);

  return (
    <section>
      <div css={selectArea}>
        <div css={selectWrap}>
        {!rhythmType 
        ? <><select css={select} value={mSelectedBeat} 
          onChange={(e)=>{setMSelectedBeat(Number(e.target.value))}}
          >
            {mBeatSets.map((b,index)=>
            <option key={index} value={index}>{b.name}</option>
            )}
          </select>
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
          </>
          : null
          //  <select css={select} value={dSelectedBeat} 
          // onChange={(e)=>{setDSelectedBeat(Number(e.target.value))}}
          // >
          //   {dBeatSets.map((b,index)=>
          //   <option key={index} value={index}>{b.name}</option>
          //   )}
          // </select>
          }
        
        </div>
      </div>
    </section>
  );
};

const selectArea = css`
  width: ${size.vw(375, 305)};
  max-width: ${size.rem(305)};
  margin-left: auto;
  margin-right: auto;
  ${mq("lg")} {
    max-width: ${size.rem(510)};
  }
`;
const selectWrap = css`
  margin-top: ${size.vh(728, 20)};
  position: relative;
  width: max-content;
  ${mq("lg")} {
    margin-top: ${size.vh(1280, 55)};
  }
  > svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(-50%);
  }
`;

const select = css`
  color: var(--color-white);
  font-family: var(--font-en);
  letter-spacing: 0.2em;
  width: ${size.vw(375, 78)};
  padding:.3em;
  ${mq("s")} {
    width: ${size.rem(78)};
  }
  ${mq("lg")} {
    width: ${size.rem(78)};
    font-size: ${size.rem(18)};
  }
`;
