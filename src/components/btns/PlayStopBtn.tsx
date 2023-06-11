import { css } from "@emotion/react";

import { FC } from "react";

type Props = {
  state: boolean,
  disabled?: boolean
}

export const PlayStopBtn: FC<Props> = (props) => {
  const { state, disabled = false } = props;
  return (
    <button css={btnStyle} type="button" disabled={disabled}>
      <span css={[btnIcon ,state?play:stop]}></span>
    </button>
  );
}

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