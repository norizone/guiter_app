import { useState, Fragment, useLayoutEffect } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";

import { mq, size } from "@/theme/cssFunctions";
import { noteKeySets } from "@/stores/NoteKeySets";

import type { FC } from "react";

type Props = {
  allStringPositions: Record<number, Array<number>>;
  processedCode: Array<number | false>;
};

export const CodeFretBoard: FC<Props> = (props) => {
  const { processedCode, allStringPositions } = props;
  const noteKeys = useRecoilValue(noteKeySets);
  const [maxPosition, setMaxPosition] = useState<number>(0);
  const [maxFrets, setMaxFrets] = useState<number>(4);
  const [barreFirstIndex, setBarreFirstIndex] = useState<number>(-1);
  const [barreHeight, setBarreHeight] = useState<number>(30);
  const [noDotPositions] = useState<Array<number>>([0, 1, 11, 13, 23]);

  const resetBarre = () => {
    setBarreFirstIndex(-1);
    setBarreHeight(30);
    return;
  };

  useLayoutEffect(() => {
    if (processedCode?.length === 0) return;
    const numPositions = processedCode.filter(
      (v): v is number => typeof v === "number"
    );
    const newMaxPosition = Math.max(...numPositions);
    const newMinPosition = Math.min(...numPositions);
    setMaxPosition(newMaxPosition);
    setMaxFrets(newMaxPosition < 3 ? 3 : 4);
    const compProcessedCode = new Set(processedCode);

    if (compProcessedCode.size === processedCode.length) return;
    const duplicateIndexes: Array<number> = [];
    const search: { [key: number]: Array<number> } = {};
    processedCode.map((v, index) => {
      if (typeof v === "boolean" || v === 0 || v !== newMinPosition) return;
      if (search[v]) {
        search[v].push(index);
      } else {
        search[v] = [index];
      }
    });
    for (const key in search) {
      if (search[key].length > 0) {
        duplicateIndexes.push(...search[key]);
      }
    }
    if (duplicateIndexes.length < 2) resetBarre();
    const start = duplicateIndexes[0];
    const end = duplicateIndexes.slice(-1)[0];
    const long = (end - start + 1) * 40 - 8;
    setBarreFirstIndex(start);
    setBarreHeight(long);
  }, [processedCode]);

  const barreCodeStyle = css`
    --barre-height: ${barreHeight}px;
    --barre-top: 4px;
  `;

  return (
    <div>
      <table css={wrap}>
        <tbody>
          {processedCode.map((position, rowIndex) => (
            <Fragment key={rowIndex}>
              <tr
                css={[
                  primaryRow,
                  rowIndex === 0 && firstRow,
                  processedCode.length === rowIndex + 1 && lastRow,
                  maxPosition - maxFrets < 0 && openRow,
                  barreFirstIndex > -1 &&
                    barreFirstIndex === rowIndex &&
                    barreCodeStyle,
                  css`
                    --start-gradient: ${rowIndex * 0.05};
                    --end-gradient: ${(rowIndex + 1) * 0.05};
                  `,
                ]}
              >
                {Array(maxFrets)
                  .fill("")
                  .map((_, boxIndex) => {
                    return (
                      <td
                        key={boxIndex}
                        css={[
                          primaryBox,
                          boxIndex + 1 - maxFrets + maxPosition === 0 &&
                            openBox,
                          boxIndex + 1 - maxFrets + maxPosition === position &&
                            activeBox,
                          typeof position === "boolean" &&
                            position === false &&
                            muteBoxMute,
                        ]}
                      >
                        {boxIndex + 1 - maxFrets + maxPosition === position
                          ? typeof position !== "boolean" &&
                            noteKeys[allStringPositions[rowIndex + 1][position]]
                              ?.name
                          : ""}
                      </td>
                    );
                  })}
              </tr>
              {processedCode.length === rowIndex + 1 && (
                <tr css={[baseRow, processedCode.length === 6 && string6]}>
                  {Array(maxFrets)
                    .fill("")
                    .map((_, numIndex) => (
                      <td
                        key={numIndex}
                        css={[
                          numberBox,
                          numIndex + 1 - maxFrets + maxPosition === 12 &&
                            doubleDotRow,
                          (numIndex + 1 - maxFrets + maxPosition) % 2 !== 0 &&
                            noDotPositions.every(
                              (d) => d !== numIndex + 1 - maxFrets + maxPosition
                            ) &&
                            oneDotRow,
                        ]}
                      >
                        <span>
                          {numIndex + 1 - maxFrets + maxPosition !== 0
                            ? numIndex + 1 - maxFrets + maxPosition
                            : ""}
                        </span>
                      </td>
                    ))}
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// base
const columnBorderBase = css`
  background: var(--primary-border);
  width: 1px;
  content: "";
  height: var(--box-height, 100%);
  position: absolute;
  top: var(--box-top, auto);
  bottom: 0;
`;

const string6 = css`
  --dot-top: -130px;
  --double-top-hi: -170px;
  --double-top-lo: -90px;
`;

const wrap = css`
  border-spacing: 0;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
`;

// row
const baseRow = css`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

const primaryRow = css`
  ${baseRow}
  background-image: linear-gradient(0deg, rgba(73,102,125,var(--end-gradient,1)) 0%, rgba(73,102,125,var(--start-gradient,0)) 100%);
  &::after {
    ${columnBorderBase}
    left: 0;
  }
  &::before {
    left: 0;
    width: 100%;
    position: absolute;
    top: 50%;
    height: 1px;
    background: var(--primary-border);
    content: "";
    z-index: -1;
  }
  &:first-of-type {
    --box-height: 50%;
  }
  &:last-of-type {
    margin-bottom: ${size.vh(728, 30)};
    ${mq("s")} {
      margin-bottom: ${size.rem(30)};
    }
  }
`;

const firstRow = css`
  background-size: auto 50%;
  background-position: bottom;
`;

const lastRow = css`
  background-size: auto 50%;
  background-position: top;
  --box-height: calc(50% + 1px);
  --box-top: 0;
`;

const openRow = css`
  &::after {
    display: none;
  }
  &::before {
    left: ${size.rem(70)};
    width: calc(100% - 70px);
  }
`;

// box
const primaryBox = css`
  width: ${size.rem(70)};
  height: ${size.rem(40)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: transparent;
  position: relative;
  z-index: 1;
  font-size: ${size.rem(14)};
  font-family: var(--font-en);
  font-weight: 300;
  letter-spacing: 0.1em;
  line-height: 1em;
  &::after {
    ${columnBorderBase}
    right: 0;
  }
`;

const activeBox = css`
  color: var(--color-white);
  &::before {
    top: var(--barre-top, auto);
    position: absolute;
    width: 30px;
    height: var(--barre-height, 30px);
    background: var(--color-blue);
    content: "";
    z-index: -1;
    border-radius: 30px;
  }
`;

const muteBoxMute = css`
  &:first-of-type {
    position: relative;
    &::before {
      background: #b7b7b7;
      clip-path: polygon(
        10% 0,
        0 10%,
        40% 50%,
        0 90%,
        10% 100%,
        50% 60%,
        90% 100%,
        100% 90%,
        60% 50%,
        100% 10%,
        90% 0,
        50% 40%
      );
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      z-index: 1;
    }
  }
`;

const openBox = css`
  background: var(--color-bg);
  &:after {
    width: 10px;
  }
`;

// number
const numberBox = css`
  width: ${size.rem(70)};
  padding-right: ${size.rem(10)};
  text-align: center;
  color: var(--color-font);
  font-family: var(--font-en);
  font-weight: 400;
`;

const baseDot = css`
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary-border);
  filter: brightness(0.8);
  z-index: -1;
  left: calc(50% - 15px);
  content: "";
  border-radius: 50%;
`;

const oneDotRow = css`
  position: relative;
  &::after {
    ${baseDot}
    top: var(--dot-top);
  }
`;

const doubleDotRow = css`
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
