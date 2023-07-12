import { useRecoilValue } from "recoil";
import { mq, size } from "@/theme/cssFunctions";
import { css } from "@emotion/react";
import { useState } from "react";

import { FretBoard } from "@/features/scale/components/FretBoard";
import { tuningSets } from "@/features/scale/stores/TuningSets";
import { scaleSets } from "@/features/scale/stores/ScaleSets";
import { noteKeySets } from "@/stores/NoteKeySets";
import {
  scaleSelectedKey,
  scaleSelectedScale,
  scaleSelectedTuning,
} from "@/features/scale/stores/ScaleValues";

export const FretBoardContents = () => {
  const tunings = useRecoilValue(tuningSets);
  const noteKeys = useRecoilValue(noteKeySets);
  const scales = useRecoilValue(scaleSets);
  const selectedTuningIndex = useRecoilValue<number>(scaleSelectedTuning);
  const selectedNoteKeyIndex = useRecoilValue<number>(scaleSelectedKey);
  const selectedScaleIndex = useRecoilValue<number>(scaleSelectedScale);
  const [fretNumbers] = useState<Array<number>>(
    Array.from({ length: 25 }, (_, index) => index)
  );
  const [noDotPositions] = useState<Array<number>>([0, 1, 11, 13, 23]);

  return (
    <div css={[fretWrap]}>
      {tunings[selectedTuningIndex].value.map((v, index) => (
        <FretBoard
          selectTuningNumber={v}
          selectScaleNumbers={scales[selectedScaleIndex].value}
          selectNoteKey={noteKeys[selectedNoteKeyIndex].value}
          key={index}
          fretRowNumber={index}
          lastFretRow={tunings[selectedTuningIndex].value.length === index + 1}
        />
      ))}
      <table>
        <tbody>
          <tr
            css={[
              numberRow,
              tunings[selectedTuningIndex].value.length === 4 &&
                dotBasePosition,
              tunings[selectedTuningIndex].value.length === 6 &&
                dotPrimaryPosition,
            ]}
          >
            {fretNumbers.map((_, index) => (
              <td
                css={[
                  numberBox,
                  index % 2 !== 0 &&
                    noDotPositions.every((d) => d !== index) &&
                    numberRowOneDot,
                  (index === 12 || index === 24) && numberRowTowDot,
                ]}
                key={index}
              >
                {index > 0 && index}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const fretWrap = css`
  margin-top: ${size.vw(375, 24)};
  overflow-x: auto;
  width: auto;
  margin-right: ${size.vw(375, 5)};
  margin-left: ${size.vw(375, 5)};
  position: relative;
  color: var(--color-white);
  @media only screen and (min-width: 1750px) {
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    max-width: 1752px;
  }
  &::-webkit-scrollbar {
    width: 0;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: var(--primary-border);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-gradient);
    border-radius: 5px;
  }
`;

const numberRow = css`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: ${size.vh(728, 30)};
  ${mq("s")} {
    margin-bottom: ${size.rem(30)};
  }
`;
const numberBox = css`
  user-select: none;
  width: ${size.rem(70)};
  padding-right: ${size.rem(10)};
  text-align: center;
  color: var(--color-font);
  font-family: var(--font-en);
  font-weight: 400;
`;

const dotPrimaryPosition = css`
  --dot-top: -130px;
  --double-top-hi: -170px;
  --double-top-lo: -90px;
`;
const dotBasePosition = css`
  --dot-top: -90px;
  --double-top-hi: -130px;
  --double-top-lo: -50px;
`;

const baseDot = css`
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary-border);
  filter: brightness(0.8);
  z-index: -1;
  top: var(--dot-top);
  left: calc(50% - 15px);
  content: "";
  border-radius: 50%;
`;

const numberRowOneDot = css`
  position: relative;
  &::after {
    ${baseDot}
    top: var(--dot-top);
  }
`;

const numberRowTowDot = css`
  position: relative;
  &::after,
  &::before {
    ${baseDot}
  }
  &::after {
    top: var(--double-top-hi);
  }
  &::before {
    top: var(--double-top-lo);
  }
`;
