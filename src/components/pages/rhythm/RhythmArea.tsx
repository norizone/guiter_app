import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";

import { IsRhythmPlaying  } from "@/stores/RhythmState";
import { useRhythmPlayer } from "@/hooks/useRhythmPlayer";
import { SelectBeat } from "./SelectBeat";


export const RhythmArea = () => {
  const isPlay = useRecoilValue(IsRhythmPlaying);
  const { onPlay, onStop,PrimaryRhythmPlayer  } = useRhythmPlayer();

  return (
    <div>
      <SelectBeat />
      <PrimaryRhythmPlayer />
      <button css={btnStyle} type="button" onClick={()=>{ !isPlay? onPlay() : onStop()}}>
        <span css={[
            btnIcon, 
            isPlay ? stop : play
            ]}></span>
      </button>
    </div>
  );
};

// play stop Btn
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
		clip-path: polygon(0% 0%, 0% 100%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 0 0);
`

const stop = css`
			clip-path: polygon(0% 0%, 0% 100%, 33% 100%, 33% 0, 66% 0, 66% 100%, 33% 100%, 33% 100%, 100% 100%, 100% 0%);
`