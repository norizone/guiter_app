import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useRecoilValue } from "recoil";

import { size } from "@/theme/cssFunctions";
import { noteKeySets } from "@/stores/NoteKeySets"

import type { FC } from "react"

type Props = {
  selectTuningNumber: number
  selectScaleNumbers: Array<number>
  selectNoteKey: number
  fretRowNumber: number
  lastFretRow?: boolean
}

export const FretBoard: FC<Props> = (props) => {
  const [frets, setFrets] = useState<Array<number>>([])
  const [keyWithPositions,setKeyWithPositions] = useState<Array<number>>([]);
  const { selectTuningNumber, selectScaleNumbers, selectNoteKey, fretRowNumber, lastFretRow } = props;
  const originNoteKeys = useRecoilValue(noteKeySets)

  const fretColor = css`
  --start-gradient: ${fretRowNumber * .05} ;
  --end-gradient:${(fretRowNumber + 1) * .05};
  `

  useEffect(() => {
    const newNotes: Array<number> = []
    for (let loop = 1, noteKey = selectTuningNumber; loop < 26; loop++) {
      newNotes.push(originNoteKeys[noteKey].value);
      (noteKey >= 11) ? noteKey = 0 : noteKey++;
    }
    setFrets(newNotes)
  }, [selectTuningNumber, originNoteKeys ])

    // rootを0にできてないkeyを変更したときに

  useEffect(()=>{
    if(frets.length===0)return;
    const rootNumber = frets.indexOf(selectNoteKey);
    const firstIndex = rootNumber===0 ? 0 : 12 - rootNumber;
    const newPositions = []
    for (let i = 0, keyPosition = firstIndex; i < frets.length; i++) {
      newPositions.push(keyPosition);
      (keyPosition >= 11) ? keyPosition = 0 : keyPosition++;
    }
    setKeyWithPositions(newPositions)
  },[selectNoteKey,frets])
  
  return (
      <table css={[fretStyle]}>
        <tbody>
          <tr css={[rowStyle]}>
            {frets.length > 0 && frets.map((el, index) => (
              <td css={[
                primaryFretStyle,
                fretColor,
                fretRowNumber === 0 && firstBoard, 
                lastFretRow && lastBoard,
                index === 0 && openFret,
                selectScaleNumbers.some(s => s === keyWithPositions[index]) &&  activeFret,
                keyWithPositions[index] === 0 && rootFret,
              ]}
                key={index}>
                  {originNoteKeys[el].name}
                </td>
            ))}
          </tr>
        </tbody>
      </table>
  )
}

const fretStyle = css`
		border-spacing: 0;
`

const rowStyle = css`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    &::after{
    position: absolute;
    top: 50%;
    left: ${size.rem(70)};
    width: calc(100% - 70px);
    height: 1px;
    background: var(--primary-border);
    content:'';
    z-index: -1;
    }
`

const primaryFretStyle = css`
    background-image: linear-gradient(0deg, rgba(73,102,125,var(--end-gradient,1)) 0%, rgba(73,102,125,var(--start-gradient,0)) 100%);
    width: ${size.rem(70)};
    height: ${size.rem(40)};
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    position: relative;
    font-size: ${size.rem(14)};
    font-family: var(--font-en);
    font-weight: 300;
    letter-spacing: .1em;
    line-height: 1em;
    &::after{
      background: var(--primary-border);
      width: 1px;
      content: '';
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
    }
`

const openFret = css`
    color: var(--color-white);
    background: var(--color-bg);
    &:after{
      width: 10px;
    }
`

const activeFret = css`
    color: var(--color-white);
    position: relative;
    z-index: 0;
    &::before{
      background : var(--color-blue);
      width: 30px;
      height: 30px;
      position: absolute;
      content: '';
      z-index: -1;
      border-radius: 100%;
    }
`

const rootFret = css`
      color: var(--color-white);
      position: relative;
      z-index: 0;
      &::before{
      background : var(--color-dark-blue);
      width: 30px;
      height: 30px;
      position: absolute;
      content: '';
      z-index: -1; 
      border-radius: 100%;
      }
`

const firstBoard = css`
    background-size: auto 50%;
    background-position: bottom;
    &::after{
      bottom: 0;
      height: 50%;
    }
`;

const lastBoard = css`
 background-size: auto 50%;
 background-position: top;
    &::after{
      top: 0;
      height: calc(50% + 1px);
    }
`
