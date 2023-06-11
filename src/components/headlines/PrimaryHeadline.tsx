import { css } from "@emotion/react";

import { size,mq } from "@/theme/cssFunctions";

import type { FC } from "react"

type Props = {
  children?: React.ReactNode
  tag?: React.ElementType
}

export const PrimaryHeadline: FC<Props> = (props) => {
  const { children, tag } = props;
  const CustomTag: React.ElementType = tag ?? "h1";
  return <CustomTag css={style}>{children}</CustomTag>;
};

const style = css`
text-align: center;
font-family: var(--font-en);
font-weight: 500;
position: relative;
line-height: 1;
padding-bottom: ${size.rem(18)};
display: block;
font-size: ${size.rem(36)};
letter-spacing: 0.05em;
padding-top: ${size.vh(730,60)};
${ mq('lg')}{
  padding-top: ${size.vh(1300,173)};
}
`;


