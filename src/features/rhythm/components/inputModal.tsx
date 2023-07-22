import { mq, size } from "@/theme/cssFunctions";
import { css } from "@emotion/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { useModal } from "@/hooks/useModal";
import { useDebounceTime } from "@/hooks/useDebounce";
import {
  dramsState,
  composeDramsState,
  type DramsState,
} from "@/stores/DramsState";
import closeIcon from "@/assets/img/close.svg";

import type { FC } from "react";

type Props = {
  selectIndex: number;
};
type KeyName = "attack" | "release" | "volume";
type SettingInputs = {
  keyName: KeyName;
  min: number;
  max: number;
  step: number;
};

const settingInputs: Array<SettingInputs> = [
  {
    keyName: "attack",
    min: 0.1,
    max: 1,
    step: 0.1,
  },
  {
    keyName: "release",
    min: 1,
    max: 10,
    step: 1,
  },
  {
    keyName: "volume",
    min: 0.0,
    max: 1,
    step: 0.1,
  },
];

export const InputModal: FC<Props> = (props) => {
  const { selectIndex = 0 } = props;
  const debounce = useDebounceTime(1000);
  const [userDramStates, setUserDramStates] = useRecoilState(dramsState);
  const composeDrams = useRecoilValue(composeDramsState);
  const copyComposeDrams = Object.assign({}, composeDrams[selectIndex]);
  const [inputValues, setInputValues] = useState<
    Pick<DramsState, "attack" | "release" | "volume">
  >({
    attack: copyComposeDrams.attack,
    release: copyComposeDrams.release,
    volume: copyComposeDrams.volume,
  });
  const { closeModal } = useModal();

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    keyName: KeyName,
    max: number,
    min: number
  ) => {
    const newValues = inputValues;
    const newValue = Number(event.target.value);
    const isValidateNewValue = min <= newValue && newValue <= max && true;
    if (newValue === newValues[keyName] || !isValidateNewValue) return;
    newValues[keyName] = newValue;
    setInputValues({ ...newValues });
    debounce(() => {
      const newUserDramStates = { ...userDramStates[selectIndex] };
      newUserDramStates[keyName] = newValue;
      setUserDramStates([
        ...userDramStates.slice(0, selectIndex),
        newUserDramStates,
        ...userDramStates.slice(selectIndex + 1),
      ]);
    });
  };

  return (
    <div css={modal}>
      <div css={modalCloseBg} onClick={closeModal}></div>
      <div css={modalScroll}>
        <div css={modalContents}>
          <h3 css={dramsName}>{composeDrams[selectIndex].name}</h3>
          {settingInputs.map((setting, index) => (
            <div key={index}>
              <p css={label}>{setting.keyName}</p>
              <div
                css={[
                  barWrap,
                  `--bar-width:${
                    ((inputValues[setting.keyName] - setting.min) /
                      (setting.max - setting.min)) *
                    100
                  }%`,
                ]}
              >
                <input
                  id="bpmBar"
                  type="range"
                  value={inputValues[setting.keyName]}
                  onChange={(event) =>
                    setInputValue(
                      event,
                      setting.keyName,
                      setting.max,
                      setting.min
                    )
                  }
                  aria-label="BPM変更"
                  min={setting.min}
                  max={setting.max}
                  step={setting.step}
                />
              </div>
            </div>
          ))}
        </div>
        <button css={closeBtn} type="button" onClick={closeModal}>
          <img src={closeIcon} alt="" width="1" height="1" />
        </button>
      </div>
    </div>
  );
};

const modal = css`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const modalCloseBg = css`
  background: black;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const modalScroll = css`
  overflow: auto;
  max-height: 100%;
  width: 80%;
  max-width: 420px;
  z-index: 1;
  position: relative;
  padding: 10px 10px 0 0 ;
`;

const modalContents = css`
  background: var(--color-bg);
  padding: 20px 0 30px;
  width: 100%;
  height: max-content;
  color: #fff;
`;

const closeBtn = css`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 0px;
  left: auto;
  right: 0px;
  z-index: 1;
  > img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const dramsName = css`
  color: #fff;
  text-transform: capitalize;
  font-family: var(--font-en);
  text-align: center;
  padding: 0 0 20px;
  font-size: ${size.vw(375, 34)};
  ${mq("s")} {
    font-size: ${size.rem(34)};
  }
`;

const label = css`
  text-transform: capitalize;
  font-family: var(--font-en);
  font-size: ${size.vw(375, 14)};
  padding: 30px 0 20px;
  text-align: center;
  ${mq("s")} {
    font-size: ${size.rem(14)};
  }
`;

const barWrap = css`
  position: relative;
  height: ${size.vw(375, 6)};
  width: 80%;
  background: transparent;
  max-width: 300px;
  margin-bottom: ${size.vh(728, 30)};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 0;
  ${mq("s")} {
    margin-bottom: 30px;
    height: ${size.rem(6)};
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
