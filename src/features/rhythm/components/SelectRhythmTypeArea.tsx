import { useRecoilState } from "recoil";

import { mq, size } from "@/theme/cssFunctions";
import { css } from "@emotion/react";
import { selectRhythmType } from "@/stores/RhythmState";

export const SelectRhythmTypeArea = () => {
  const [rhythmType, setRhythmType] = useRecoilState(selectRhythmType);

  return (
    <div css={[selectRhythmTypeStyle, rhythmType && `--btn-position:50%`]}>
      <button
        type="button"
        onClick={() => setRhythmType(0)}
        css={[rhythmBtn, !rhythmType && btnActive]}
        disabled={!rhythmType ? true : false}
      >
        Metronome
      </button>
      <button
        type="button"
        onClick={() => setRhythmType(1)}
        css={[rhythmBtn, rhythmType && btnActive]}
        disabled={rhythmType ? true : false}
      >
        Drams
      </button>
    </div>
  );
};

const selectRhythmTypeStyle = css`
  background: var(--primary-border);
  display: flex;
  height: ${size.vw(375, 36)};
  width: ${size.vw(375, 240)};
  margin-left: auto;
  margin-right: auto;
  border-radius: ${size.vw(375, 30)};
  position: relative;
  ${mq("s")} {
    height: ${size.rem(36)};
    width: ${size.rem(240)};
  }

  ${mq("lg")} {
    height: ${size.vw(1280, 48)};
    width: ${size.vw(1280, 345)};
  }
  ${mq("xl")} {
    height: ${size.rem(48)};
    width: ${size.rem(345)};
  }
  &::after {
    height: 100%;
    width: 50%;
    content: "";
    position: absolute;
    top: 0;
    left: var(--btn-position, 0);
    background: var(--primary-gradient);
    border-radius: ${size.vw(375, 30)};
    z-index: 0;
    transition: left 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const rhythmBtn = css`
  color: white;
  width: 50%;
  font-family: var(--font-en);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  ${mq("lg")} {
    font-size: ${size.vw(1280, 20)};
  }
  ${mq("xl")} {
    font-size: ${size.rem(20)};
  }
`;

const btnActive = css`
  pointer-events: none;
`;
