import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import { css } from "@emotion/react";

import { keysFrequency, valuesFrequency } from "./frequencyScaleSets";

import type { FC } from "react";
import { size, mq } from "@/theme/cssFunctions";

let analyser :AnalyserNode;
let inputs : Float32Array;
let detector : PitchDetector<Float32Array>;
let audioContext :AudioContext;

export const AudioSketch: FC = () => {
  const streamRef = useRef<MediaStream|null>(null);
  const barPosition = useRef<number>(0);
  const animationIdRef = useRef<number>();
  const meterRef = useRef<HTMLDivElement>(null) 
  const pitchNameRef = useRef<HTMLParagraphElement>(null);
  const frequencyRef = useRef<HTMLSpanElement>(null);
  const [isOpenMic, setIsOpenMic] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      onStopAudioSketch();
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isOpenMic) return;
      animationIdRef.current = requestAnimationFrame(animate);
        updatePitch(
          analyser,
          detector,
          inputs,
          audioContext.sampleRate
          )
    };
    animate();
    return () => {
      animationIdRef.current && cancelAnimationFrame(animationIdRef.current);
    };
  }, [isOpenMic]);

  const handlerTuning = () => {
    !isOpenMic && onStartAudioSketch();
    isOpenMic && onStopAudioSketch();
  };

  const onStartAudioSketch = async () => {
    if (streamRef.current ) return;
    await micInit();
    setIsOpenMic(true);
    // ピッチ検出器
    detector = PitchDetector.forFloat32Array(analyser.fftSize);
    inputs = new Float32Array(detector.inputLength);
  };

  const onStopAudioSketch = () => {
    setIsOpenMic(false);
    streamRef.current &&
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
  };

  //マイク周り初期化
  const micInit = async () => {
    // mic設定
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: { ideal: 44100 },
        sampleSize: { ideal: 32 },
      },
    });
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    const lowpass = audioContext.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1980; // カットオフ周波数を設定
    const highpass = audioContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 30;
    const source = audioContext.createMediaStreamSource(streamRef.current);
    source.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(analyser);
    analyser.fftSize = 2048; //検証サイズ 128; 2048 4096
    analyser.smoothingTimeConstant = 0.8;
  };

  //ピークピッチ検出
  const updatePitch = (
    analyserNode: AnalyserNode,
    detector: PitchDetector<Float32Array>,
    input: Float32Array,
    sampleRate: number
  ) => {
    analyserNode.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, sampleRate);
    const accuracyPitch = clarity > 0.9 ? Math.round(pitch * 10) / 10 : 0; //clarity 正確性
    const composePitch = accuracyPitch > 30 && accuracyPitch < 1980 ? accuracyPitch : 0
    drawFrequency(composePitch);
  };

  // 周波数から一番近いものを取得
  const getClosestFrequency = (targetFrequency: number ,searchArray = valuesFrequency) => {
    let closestFrequencyIndex = 0;
    let minDifference = Infinity;
    searchArray.map((el, index) => {
      const difference = Math.abs(targetFrequency - el);
      if (difference < minDifference) {
        minDifference = difference;
        closestFrequencyIndex = index;
      }
    });
    return closestFrequencyIndex;
  };

  //ピーク値から描画
  const drawFrequency = (frequency: number) => {
    const thisFrequency = Number(frequency.toFixed(1));
    const closeFrequencyIndex = getClosestFrequency(thisFrequency);
    const thisPosition =
      frequency !== 0
        ? positionClosestFrequency(thisFrequency, closeFrequencyIndex)
        : 0;
    barPosition.current = thisPosition;
      if(pitchNameRef.current && frequencyRef.current){
        const displayFrequency = thisPosition > 2 && thisPosition < 10 ? `${thisFrequency}` : '0';
        const displayPitchName =  frequency && closeFrequencyIndex ? `${keysFrequency[closeFrequencyIndex]}` : '';
        pitchNameRef.current.textContent = displayPitchName;
        frequencyRef.current.textContent = displayFrequency;
      }
      meterRef.current?.removeAttribute('style');
      thisPosition>0 && thisPosition!==6 &&
      meterRef.current?.style.setProperty(`--meter-${thisPosition}`,'var(--color-blue)');
      thisPosition === 6 && meterRef.current?.style.setProperty(`--meter-6`,'var(--color-light-blue)');
  };

  // 前後の値を取得 現在の周波数と一番近い値のindex取得
  const positionClosestFrequency = (
    frequency: number,
    closeFrequencyIndex: number
  ) => {
    let thisPosition = 0;
    const correctValue = valuesFrequency[closeFrequencyIndex];
    if (frequency === correctValue) {
      thisPosition = 6;
    } else if (frequency > correctValue) {
      const afterValue =
        closeFrequencyIndex >= valuesFrequency.length - 1
          ? 2000
          : valuesFrequency[closeFrequencyIndex + 1];
      const step = (afterValue - correctValue) / 5;
      const calcValues: Array<number> = [];
      Array.from({ length: 5 }).map((_, index) => {
        const value = correctValue + step * index;
        calcValues.push(value);
      });
      const composeValues = [...calcValues, afterValue];
      const closestFrequency = getClosestFrequency(frequency,composeValues);
      thisPosition = 6 + closestFrequency;
    } else if (frequency < correctValue) {
      const beforeValue =
        closeFrequencyIndex === 0
          ? 0
          : valuesFrequency[closeFrequencyIndex - 1];
      const step = (correctValue - beforeValue) / 5;
      const calcValues: Array<number> = [];
      Array.from({ length: 5 }).map((_, index) => {
        const value = beforeValue + step * index;
        calcValues.push(value);
      });
      const composeValues = [beforeValue, ...calcValues];
      const closestFrequency =  getClosestFrequency(frequency,composeValues)
      thisPosition = closestFrequency + 1;
    }
    return thisPosition;
  };

  return (
    <div css={maiWrap}>
      <section>
        <div css={meterWrap} ref={meterRef}>
          <svg width="319" height="57" viewBox="0 0 319 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 37.775V18.896H1.147V37.465L0.899 36.845C1.25033 36.907 1.68433 36.845 2.201 36.659C2.71767 36.473 3.23433 36.1837 3.751 35.791C4.28833 35.3983 4.73267 34.9437 5.084 34.427C5.332 34.0757 5.518 33.6933 5.642 33.28C5.766 32.846 5.828 32.381 5.828 31.885C5.828 31.327 5.735 30.893 5.549 30.583C5.38367 30.273 5.07367 30.118 4.619 30.118C3.97833 30.118 3.317 30.397 2.635 30.955C1.97367 31.513 1.41567 32.164 0.961 32.908L0.93 31.761C1.55 30.8103 2.21133 30.0663 2.914 29.529C3.61667 28.9917 4.35033 28.723 5.115 28.723C5.859 28.723 6.45833 28.9813 6.913 29.498C7.36767 30.0147 7.595 30.7587 7.595 31.73C7.595 32.8873 7.254 33.931 6.572 34.861C5.89 35.791 4.94967 36.5247 3.751 37.062C3.21367 37.31 2.67633 37.4857 2.139 37.589C1.60167 37.713 1.07467 37.775 0.558 37.775H0Z" fill="white"/>
            <path d="M309.352 36.592V32.848L307 33.976V32.104L309.352 31V25.12L307 26.248V24.376L309.352 23.248V19.432H310.48V22.792L314.344 20.92V16.84H315.472V20.464L317.824 19.36V21.208L315.472 22.336V28.216L317.824 27.16V29.032L315.472 30.064V34.24H314.344V30.52L310.48 32.392V36.592H309.352ZM310.48 30.544L314.344 28.672V22.792L310.48 24.664V30.544Z" fill="white"/>
            <path d="M159 15L149.474 3.75L168.526 3.75L159 15Z" fill="var(--meter-6,var(--primary-border))"/>
            <g>
              <path d="M22.56 38.38C14.38 40.14 6.83 42.05 0 44.09V56.71C6.83 55.05 14.38 53.51 22.56 52.09V38.38Z" fill="var(--meter-1,var(--primary-border))"/>
              <path d="M52.1101 33.13C44.2001 34.28 36.66 35.56 29.55 36.95V50.93C36.66 49.8 44.2001 48.77 52.1101 47.84V33.13Z" fill="var(--meter-2,var(--primary-border))"/>
              <path d="M81.66 29.57C73.88 30.32 66.35 31.18 59.1 32.15V47.05C66.35 46.27 73.88 45.57 81.66 44.96V29.57Z" fill="var(--meter-3,var(--primary-border))"/>
              <path d="M111.21 27.33C103.51 27.77 95.98 28.3 88.65 28.94V44.45C95.98 43.94 103.51 43.5 111.21 43.15V27.33Z" fill="var(--meter-4,var(--primary-border))"/>
              <path d="M140.76 26.19C133.11 26.35 125.58 26.61 118.2 26.96V42.85C125.58 42.57 133.11 42.36 140.76 42.23V26.19Z" fill="var(--meter-5,var(--primary-border))"/>
              <path d="M147.76 42.13C151.44 42.09 155.14 42.07 158.87 42.07C162.6 42.07 166.53 42.09 170.32 42.13V26.08C166.56 26.03 162.78 26 158.97 26C155.16 26 151.47 26.03 147.76 26.07V42.13Z" fill="var(--meter-6,var(--primary-border))"/>
              <path d="M199.87 26.97C192.49 26.62 184.96 26.36 177.31 26.2V42.23C184.96 42.36 192.49 42.57 199.87 42.86V26.97Z" fill="var(--meter-7,var(--primary-border))"/>
              <path d="M229.42 28.95C222.09 28.31 214.56 27.78 206.86 27.34V43.17C214.57 43.52 222.09 43.96 229.42 44.48V28.95Z" fill="var(--meter-8,var(--primary-border))"/>
              <path d="M258.97 32.17C251.72 31.2 244.19 30.34 236.41 29.59V44.99C244.19 45.6 251.72 46.3 258.97 47.09V32.17Z" fill="var(--meter-9,var(--primary-border))"/>
              <path d="M288.52 36.97C281.41 35.58 273.87 34.3 265.96 33.14V47.87C273.87 48.81 281.41 49.85 288.52 50.98V36.97Z" fill="var(--meter-10,var(--primary-border))"/>
              <path d="M295.51 38.41V52.15C303.69 53.58 311.24 55.13 318.07 56.8V44.14C311.24 42.09 303.69 40.18 295.51 38.42V38.41Z" fill="var(--meter-11,var(--primary-border))"/>
            </g>
          </svg>
        </div>
        <div css={dataArea}>
          <p><span ref={frequencyRef}>0</span>Hz</p>
          <p css={pitchName} ref={pitchNameRef}>&nbsp;</p>
        </div>
      </section>
      <button onClick={handlerTuning} type="button" css={[micBtn]}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isOpenMic && (
            <g transform="translate(60, 60)">
              <circle cx="0" cy="0" r="40" fill="url(#paint0_linear_55_4)">
                <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  additive="sum"
                  from="0 0"
                  to="1 1"
                  type="scale"
                  dur="1.5s"
                  values="1; 1.6"
                  repeatCount="indefinite"
                />
              </circle>
              <linearGradient
                id="paint0_linear_55_4"
                x1="50"
                y1="0"
                x2="50"
                y2="60"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3FAEC6" />
                <stop offset="1" stopColor="#5353B2" />
              </linearGradient>
            </g>
          )}
          <circle cx="61" cy="61" r="40" fill="white" />
          <path
            d="M60.5 16C35.9231 16 16 35.9231 16 60.5C16 85.0767 35.9231 105 60.5 105C85.0767 105 105 85.0767 105 60.5C105 35.9231 85.0767 16 60.5 16ZM50.6325 47.6666C50.6366 42.2209 55.0536 37.8012 60.5009 37.7956C65.9479 37.8012 70.3647 42.2211 70.3691 47.6666V62.8239C70.3649 68.2724 65.9473 72.6893 60.5009 72.6949C55.0543 72.6892 50.6368 68.2724 50.6325 62.8239V47.6666ZM80.6418 59.581C80.6376 69.7998 72.0748 78.2319 62.2073 79.5328V83.0471H71.4781V86.5613H49.5231V83.0471H58.7939V79.5328C48.9264 78.2319 40.3622 69.7998 40.3587 59.581V59.3814H44.3096V59.581C44.3103 64.0508 46.122 68.0872 49.0593 71.0237C51.9972 73.9602 56.0337 75.7711 60.5007 75.7739C64.9674 75.7711 69.004 73.9602 71.9421 71.0237C74.8784 68.0871 76.6895 64.0506 76.6909 59.581V59.3814H80.642L80.6418 59.581Z"
            fill="url(#paint1_linear_55_4)"
          />
          <defs>
            <linearGradient
              id="paint1_linear_55_4"
              x1="60.5"
              y1="16"
              x2="60.5"
              y2="105"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3FAEC6" />
              <stop offset="1" stopColor="#5353B2" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  );
};

const maiWrap = css`
  margin-top:${size.vh(724,144)};
  ${mq('lg')}{
    margin:144px;
  }
`;

const micBtn = css`
  height: 80px;
  width: 80px;
  margin-inline: auto;
  margin-top: 60px;
  display: block;
  > svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const meterWrap = css`
    width: 100%;
    max-width: 480px;
    margin-inline: auto;
    padding-inline:30px ;
    >svg{
      display: block;
      width: 100%;
      height:auto;
    }
`

const dataArea = css`
  font-family: var(--font-en);
  display: grid;
  grid-template-rows:1em ${size.rem(40)} ;
  row-gap:.3em;
  justify-content: center;
  align-items: center;
  text-align:center;
`;

const pitchName = css`
  font-size:${size.rem(40)};
`
