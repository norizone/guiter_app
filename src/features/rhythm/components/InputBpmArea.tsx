import { mq, size } from "@/theme/cssFunctions";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { useDebounceTime } from "@/hooks/useDebounce";
import { bpmNumberState } from "@/stores/RhythmState";

export const InputBpmArea = () => {
  const [maxNum] = useState(280);
  const [minNum] = useState(40);
  const [bpmNumber, setBpmNumber] = useRecoilState(bpmNumberState);
  const [inputBpm, setInputBpm] = useState(`${bpmNumber}`);
  const [bpmBar, setBpmBar] = useState(maxNum);
  const debounce = useDebounceTime(300);

  const setBpmStates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.floor(Number(event.target.value));
    setInputBpm(newValue + "");
    debounce(() => {
      const composeNewValue =
        newValue > minNum && newValue <= maxNum
          ? newValue
          : newValue <= minNum
          ? minNum
          : maxNum;
      setBpmNumber(composeNewValue);
      Number(inputBpm) !== composeNewValue && setInputBpm(composeNewValue + "");
    });
  };

  useEffect(() => {
    const maxPoint = maxNum - minNum;
    const thisPoint = Number(inputBpm) - minNum;
    const newValue = (thisPoint / maxPoint) * 100;
    setBpmBar(newValue);
  }, [inputBpm, minNum, maxNum]);

  return (
    <div css={[bpmWrap]}>
      <p>
        <span>BPM</span>
        <input
          type="number"
          value={inputBpm}
          onChange={(event) => setBpmStates(event)}
          css={[bmpInput]}
          aria-label="BPM変更"
          min={minNum}
          max={maxNum}
          step="1"
        />
      </p>
      <div css={[bpmBarWrap, `--bar-width:${bpmBar}%`]}>
        <input
          id="bpmBar"
          type="range"
          value={inputBpm}
          onChange={(event) => setBpmStates(event)}
          aria-label="BPM変更"
          min={minNum}
          max={maxNum}
          step="1"
        />
      </div>
    </div>
  );
};

const bpmWrap = css`
  user-select: none;
  margin-top: ${size.vh(728, 34)};
  text-align: center;
  color: var(--font-primary);
  font-family: var(--font-en);
  font-size: ${size.vw(375, 16)};
  ${mq("s")} {
    font-size: ${size.rem(16)};
  }
  ${mq("lg")} {
    font-size: ${size.vw(1280, 24)};
    margin-top: ${size.vh(1000, 85)};
  }
  ${mq("xl")} {
    font-size: ${size.rem(24)};
  }
`;

const bmpInput = css`
  margin-left: ${size.vw(375, 12)};
  color: var(--font-primary);
  font-family: var(--font-en);
  font-size: ${size.vw(375, 18)};
  background: var(--color-gray);
  padding: ${size.vw(375, 8)} ${size.vw(375, 24)};
  text-align: center;
  width: 8em;
  ${mq("s")} {
    padding: ${size.rem(8)} ${size.rem(24)};
    font-size: ${size.rem(18)};
    margin-left: ${size.rem(12)};
  }
  ${mq("lg")} {
    font-size: ${size.vw(1280, 26)};
    padding: ${size.vw(1280, 5)} ${size.vw(1280, 40)};
  }
  ${mq("xl")} {
    font-size: ${size.rem(26)};
    padding: ${size.rem(5)} ${size.rem(40)};
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const bpmBarWrap = css`
  position: relative;
  height: ${size.vw(375, 6)};
  width: 100%;
  background: transparent;
  max-width: 518px;
  margin-top: ${size.vh(728, 28)};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 0;
  ${mq("s")} {
    height: ${size.rem(6)};
  }
  ${mq("lg")} {
    margin-top: ${size.vh(1280, 66)};
  }
  &::before {
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: var(--primary-border);
    z-index: 0;
  }
  &::after {
    height: 100%;
    max-width: 100%;
    min-width: 0%;
    width: var(--bar-width, 0);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: var(--primary-gradient);
    z-index: 1;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    --bar-circle: ${size.vw(375, 22)};
    ${mq("s")} {
      --bar-circle: ${size.rem(20)};
    }
  }

  /* WebKit向けのつまみ */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: var(--color-white);
    width: var(--bar-circle);
    height: var(--bar-circle);
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  /* Moz向けのつまみ */
  input[type="range"]::-moz-range-thumb {
    background: var(--color-white);
    width: var(--bar-circle);
    height: var(--bar-circle);
    border-radius: 50%;
    border: none;
    position: relative;
    z-index: 3;
  }
  /* Firefoxで点線が周りに表示されてしまう問題の解消 */
  input[type="range"]::-moz-focus-outer {
    border: 0;
  }
  /* つまみをドラッグしているときのスタイル */
  input[type="range"]:active::-webkit-slider-thumb {
    box-shadow: 0px 1px 10px -2px var(--primary-border);
  }
`;
