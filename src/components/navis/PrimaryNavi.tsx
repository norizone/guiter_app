import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

import { mq, size } from "@/theme/cssFunctions";
import { NaviIcon } from "@/components/icons/NaviIcon";

import type { PageList } from "@/types/components";

export const PrimaryNavi = () => {
  const links: Array<PageList> = ['rhythm','code', 'scale','tuning'];
  const pathname = useLocation().pathname;

  return (
    <nav css={navStyle}>
      <ul css={listStyle}>
        {links.map((el, index) => (
          <li key={index} css={itemStyle}>
            <Link to={el} css={[
              linkStyle,
              pathname.startsWith(`/${el}`) && currentStyle,
              pathname==='/' && el === 'rhythm' && currentStyle
              ]}>
              <span>{el}</span>
              <NaviIcon iconType={el} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
const currentStyle = css`
  --current-color : var(--color-light-blue);
`
const navStyle = css`
 position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  left: 0;
  width: 100%;
  z-index: 100;
  font-family: var(--font-en);
  height: calc( ${size.vw(375, 58)} + env(safe-area-inset-bottom) ) ;
  background:rgba(3, 7 ,30 , .7);
  backdrop-filter: blur(5px);
  ${mq('s')}{
    height: ${size.rem(58)};
  }
  ${mq('lg')}{
    background: transparent;
    width: ${size.vw(1366, 295)};
    top: 0;
    left: inherit;
    right: ${size.vw(1366, 150)};
  }
  ${mq('xxl')}{
    width: ${size.rem(295)};
  }
`

const listStyle = css`
  display: flex;
  width: ${size.vw(375, 300)};
  margin-right: auto;
  margin-left: auto;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 2.5% 0;
  ${mq('lg')}{
    width: 100%;
    padding: 0;
  }
`

const itemStyle = css`
  text-align: center;
  font-size: ${size.rem(12)};
  `

const linkStyle = css`
  color:var(--current-color , #fff);
	text-transform: capitalize;
  display: flex; 
  flex-flow: column-reverse nowrap;
  justify-content: center;
  align-items: center;
  & span {
    margin-top:${size.rem(4)};
  }
  & svg {
    width:${size.vw(375,20)};
    max-width:${size.rem(20)};
    margin-inline: auto;
    vertical-align:bottom;
    ${mq('lg')}{
      display: none;
    }
  }
`