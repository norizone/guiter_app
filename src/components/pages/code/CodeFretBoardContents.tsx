import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRecoilValue , useRecoilState } from "recoil"
import { useEffect, useState ,useRef } from "react"
import { css } from "@emotion/react"
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { codeNameSets } from "@/stores/CodeNameSets"
import { noteKeySets } from "@/stores/NoteKeySets"
import { mq ,size } from "@/theme/cssFunctions"
import { CodeFretBoard } from "@/components/pages/code/CodeFretBoard";

import { typeCodeJson } from "@/types/components";
import { codeSelectedCode, codeSelectedKey } from "@/stores/CodeValues";

export const CodeFretBoardContents = ()=>{
  const noteKeys = useRecoilValue(noteKeySets);
  const codeNames = useRecoilValue(codeNameSets);
  const selectedNoteKeyIndex = useRecoilValue(codeSelectedKey);
  const selectedCodeNameIndex = useRecoilValue(codeSelectedCode);
  const [selectedCodeData, setSelectedCodeData] = useState<Array<typeCodeJson>>([])
  const [selectedTuning] = useState([4, 11, 7, 2, 9, 4])
  const [processedCode, setProcessedCode] = useState<Array<Array<number | false>>>([])
  const [allStringPositions, setAllStringPositions] = useState<Record<number, Array<number>>>({})
  const refNext = useRef<HTMLSpanElement>(null);
  const refPrev = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const controller = new AbortController();
    const options: AxiosRequestConfig = {
      url: `./code/code_${codeNames[selectedCodeNameIndex].name}.json`,
      method: "GET",
      signal: controller.signal,
    }
    const getCodeValues = async () => {
      await axios(options).then((res: AxiosResponse<Array<typeCodeJson>>) => {
        setSelectedCodeData(res.data)
      }).catch((e) => { console.log(e) });
      return () => {
        controller.abort()
      }
    }
    getCodeValues()
  }, [selectedCodeNameIndex, codeNames])

  useEffect(() => {
    const newAllStringPositions: Record<number, Array<number>> = {}
    selectedTuning.map((el, num) => {
      const string: Array<number> = [];
      // 17フレットまでの音階
      for (let loop = 0, keyNum = el; loop < 16; loop++) {
        string.push(noteKeys[keyNum].value);
        keyNum >= 11 ? (keyNum = 0) : keyNum++;
      }
      newAllStringPositions[num + 1] = string
    })
    setAllStringPositions(newAllStringPositions)
  }, [noteKeys, selectedTuning])


  useEffect(() => {
    if (Object.keys(allStringPositions).length === 0) return
    const targetKeyPositions: Record<number, number> = {};
    // 6弦から4弦までの選択音の位置
    for (let stringIndex = 6; stringIndex >= 4; stringIndex--) {
      targetKeyPositions[stringIndex] = allStringPositions[stringIndex].findIndex(el => el === selectedNoteKeyIndex)
    }
    const newProcessedCode: Array<Array<number | false>> = []
    selectedCodeData.map((data) => {
      const { composition } = data
      for (let stringIndex = 6; stringIndex >= 4; stringIndex--) {
        if (data.rootString === stringIndex) {
          const proceedPosition = Object.values(composition).map(el => {
            if (el !== false) {
              return Number(el) + targetKeyPositions[stringIndex];
            }
            else {
              return false
            }
          })
          // 0を含まず&&カウントが5個以上&&最小値が1個の場合
          const numberValue = proceedPosition.filter((v): v is number => typeof v === 'number');
          const minPosition = numberValue.length !== 0 && Math.min(...numberValue);
          const minArray = proceedPosition.filter((el) => el === minPosition);
          const duplicates = [...numberValue.filter((value, index, self) => self.indexOf(value) !== index)];
          const minDuplicates = Math.min(...duplicates)
          const removeBarreCode = minDuplicates ? numberValue.filter(el => el !== minDuplicates) : []
          removeBarreCode.length > 0 && removeBarreCode.push(minDuplicates);

          // 値にマイナスを含むもの&&物理的に押せない5本指以上のコードはスルー
          if (proceedPosition.every((el) => Number(el) > -1) &&
            removeBarreCode.length < 5 &&
            numberValue.some((el) => el !== 0) &&
            minArray.length !== 1
          ) {
            newProcessedCode.push(proceedPosition);
          }
        }
      }
    })
    newProcessedCode.length > 1 && newProcessedCode.sort((a, b) => {
      return Math.max(Number(...a)) - Math.max(Number(...b));
    });
    setProcessedCode(newProcessedCode)
  }, [selectedCodeData, selectedNoteKeyIndex, allStringPositions, selectedTuning])

  
  return (
    <div css={[
      slider,
      processedCode.length !== 0 && sliderActive
      ]}>
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: refNext?.current,
        prevEl: refPrev?.current,
      }}
      breakpoints={{
        //box一つが340
        '708': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '1120': {
          slidesPerView: 3,
        },
        '1480': {
          slidesPerView: 4,
        },
        '1920': {
          slidesPerView: 5,
        },
        '2280': {
          slidesPerView: 6,
        },
        '2600': {
          slidesPerView: 7,
        },
        '2840': {
          slidesPerView: 8,
        },
      }}
    >
      {processedCode?.map((codeData, index) => (
        <SwiperSlide key={index}>
          <CodeFretBoard processedCode={codeData} allStringPositions={allStringPositions} />
        </SwiperSlide>
      ))}
    </Swiper>
    <span css={sliderPrev} ref={refPrev}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="20"
        viewBox="0 0 8.278 15.557"
      >
        <path
          d="M658.485,1444.985l-7.071,7.071-7.071-7.071"
          transform="translate(1452.556 -643.636) rotate(90)"
          fill="none"
          strokeWidth="1"
        />
      </svg>
    </span>
    <span css={sliderNext} ref={refNext}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="20"
        viewBox="0 0 8.278 15.557"
      >
        <path
          d="M658.485,1444.985l-7.071,7.071-7.071-7.071"
          transform="translate(-1444.278 659.192) rotate(-90)"
          fill="none"
          strokeWidth="1"
        /></svg>
    </span>
  </div>
  )
}

const slider = css`
   user-select: none;
    width: 100%;
    margin-top: ${size.vw(375, 24)};
    position: relative;
    padding-left: 0;
    padding-right: 0;
    z-index: 0;
    opacity:0;
    transform:opacity .2s linear;
    ${mq('s')}{
      padding-left: 5%;
      padding-right: 5%;
    }
    & .swiper-wrapper {
      width: max-content;
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
    }
`
const sliderActive  = css`
  opacity:1;
`

const sliderBaseNavigation = css`
    position: absolute;
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    top: 0;
    z-index: 1;
    transition:opacity .2s linear ;
    >svg{
      stroke:#707070;
      transition:stroke .2s linear;
    }
    @media (hover:hover) {
      cursor: pointer;
    &:hover{
      >svg{
        stroke:var(--color-light-blue);
      }
    }
  }
    &.swiper-button-disabled{
    opacity:0;
  }
`
const sliderPrev = css`
  ${sliderBaseNavigation}
  left:1%;
  justify-content:flex-start;
  ${mq('s')}{
    left: 2.5%
  }
`

const sliderNext = css`
  ${sliderBaseNavigation}
  right:1%;
  left:auto;
  justify-content:flex-end;
  ${mq('s')}{
    right:2.5%;
  }
`