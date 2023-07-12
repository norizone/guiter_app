import { css } from "@emotion/react";

import { mq, size } from "@/theme/cssFunctions";

import type { FC } from "react";

type Props = {
  children: React.ReactNode;
  areaType?: "input";
};

export const PrimaryInputsWrap: FC<Props> = (props) => {
  const { children, areaType } = props;
  return (
    <div css={[wrapStyle, areaType === "input" && inputWrapStyle]}>
      {children}
    </div>
  );
};

const wrapStyle = css`
  margin-top: ${size.vh(724, 22)};
  width: ${size.vw(375, 300)};
  margin-left: auto;
  margin-right: auto;
  max-width: ${size.rem(300)};
  ${mq("lg")} {
    margin-top: ${size.vh(1000, 68)};
    width: ${size.vw(1280, 800)};
    max-width: ${size.rem(800)};
  }
`;

const inputWrapStyle = css`
  display: flex;
  flex-flow: column nowrap;
  row-gap: ${size.rem(16)};
  ${mq("lg")} {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
`;
