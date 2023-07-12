import { FC } from "react";

import type { PageList } from "@/types/components";

type Props = {
  iconType: PageList;
};

export const NaviIcon: FC<Props> = (props) => {
  const { iconType } = props;
  return (
    <>
      {iconType === "tuning" && (
        <svg
          v-if="title === 'tuning'"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g transform="translate(-470.932 -666.933)">
            <line
              y2="14.437"
              transform="translate(473.774 675.545)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <circle
              cx="2.592"
              cy="2.592"
              r="2.592"
              transform="translate(471.182 670.361)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y2="4.116"
              transform="translate(483.034 685.867)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y2="13.749"
              transform="translate(483.034 666.933)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <circle
              cx="2.592"
              cy="2.592"
              r="2.592"
              transform="translate(480.442 680.682)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y2="12.368"
              transform="translate(492.295 677.615)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <circle
              cx="2.592"
              cy="2.592"
              r="2.592"
              transform="translate(489.703 672.431)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y1="3.428"
              transform="translate(473.774 666.933)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              id="線_84"
              data-name="線 84"
              y1="5.497"
              transform="translate(492.295 666.933)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      )}
      {iconType === "code" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g transform="translate(-549.819 -667.844)">
            <rect
              width="2.629"
              height="20.928"
              transform="translate(549.969 667.994)"
              fill="var(--current-color , #fff)"
            />
            <line
              x2="27.577"
              transform="translate(551.552 672.18)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.3"
            />
            <line
              x2="27.577"
              transform="translate(551.552 676.365)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.3"
            />
            <line
              x2="27.577"
              transform="translate(551.552 680.551)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.3"
            />
            <line
              x2="27.577"
              transform="translate(551.552 684.736)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.3"
            />
            <path
              d="M579.129,667.994h-29.16v20.928h29.16"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.3"
            />
            <circle
              cx="1.659"
              cy="1.659"
              r="1.659"
              transform="translate(557.642 670.521)"
              fill="var(--current-color , #fff)"
            />
            <circle
              cx="1.659"
              cy="1.659"
              r="1.659"
              transform="translate(571.374 674.706)"
              fill="var(--current-color , #fff)"
            />
            <line
              y2="20.928"
              transform="translate(566.115 667.994)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      )}
      {iconType === "scale" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <line
            x2="27.577"
            transform="translate(0 21.078)"
            fill="none"
            stroke="var(--current-color , #fff)"
            strokeMiterlimit="10"
            strokeWidth="0.3"
          />
          <line
            x2="27.577"
            transform="translate(0 0.15)"
            fill="none"
            stroke="var(--current-color , #fff)"
            strokeMiterlimit="10"
            strokeWidth="0.3"
          />
          <line
            x2="27.577"
            transform="translate(0 5.382)"
            fill="none"
            stroke="var(--current-color , #fff)"
            strokeMiterlimit="10"
            strokeWidth="0.3"
          />
          <line
            x2="27.577"
            transform="translate(0 10.614)"
            fill="none"
            stroke="var(--current-color , #fff)"
            strokeMiterlimit="10"
            strokeWidth="0.3"
          />
          <line
            x2="27.577"
            transform="translate(0 15.846)"
            fill="none"
            stroke="var(--current-color , #fff)"
            strokeMiterlimit="10"
            strokeWidth="0.3"
          />
          <g transform="translate(-632.193 -667.844)">
            <path
              d="M641.449,667.994h.681v9.142a2.965,2.965,0,0,1-3.117,2.9c-.782,0-1.584-.427-1.584-1.261,0-1.209,1.551-2.35,2.947-2.35a2.481,2.481,0,0,1,1.073.222Z"
              fill="var(--current-color , #fff)"
            />
          </g>
          <g transform="translate(-632.193 -667.844)">
            <path
              d="M651.76,672.263h.422a4.934,4.934,0,0,0,1.956,3.713,5.387,5.387,0,0,1,2.178,3.8,8,8,0,0,1-1.418,4.118h-.438a8.811,8.811,0,0,0,1.062-3.545,3.946,3.946,0,0,0-3.087-3.9v7a2.937,2.937,0,0,1-3.089,2.867c-.775,0-1.569-.422-1.569-1.247,0-1.2,1.536-2.329,2.92-2.329a2.471,2.471,0,0,1,1.063.22Z"
              fill="var(--current-color , #fff)"
            />
          </g>
        </svg>
      )}
      {iconType === "rhythm" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g transform="translate(-718.057 -665.31)">
            <circle
              cx="1.16"
              cy="1.16"
              r="1.16"
              transform="translate(734.036 669.285)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y2="11.675"
              transform="translate(726.939 668.957)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              x2="3.572"
              transform="translate(725.153 670.586)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              x2="3.572"
              transform="translate(725.153 673.023)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              x2="3.572"
              transform="translate(725.153 675.459)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y1="12.407"
              x2="7.588"
              transform="translate(727.027 671.45)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <path
              d="M735.524,690.751H718.354l4.3-25.191h8.573Z"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              x2="14.822"
              transform="translate(719.53 683.857)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
            <line
              y1="1.3"
              x2="0.795"
              transform="translate(735.937 667.99)"
              fill="none"
              stroke="var(--current-color , #fff)"
              strokeMiterlimit="10"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      )}
    </>
  );
};
