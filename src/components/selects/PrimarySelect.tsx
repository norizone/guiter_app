import { css } from "@emotion/react";

import { mq, size } from "@/theme/cssFunctions";

import { useState, type FC } from "react";

type Props = {
  title: string;
  values: Array<{name:string,value:number|Array<number>}>;
  placeholder?:string;
  selectedIndex?: number;
  changeEvent: React.Dispatch<React.SetStateAction<number>> 
}

export const PrimarySelect: FC<Props> = (props) => {
const {title,values,placeholder,selectedIndex,changeEvent} = props;
const [selected,setSelected] = useState<number|''>(selectedIndex??'');
const handlerChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
    const i = Number(event.target.value)
    setSelected(i)
    changeEvent(i)
}
  return (
    <div css={selectStyle}>
       <p css={titleStyle}>{title}</p>
				<div css={selectWrapStyle}>
					<select css={selectBoxStyle} 
           onChange={(event)=>handlerChange(event)}
           value={selected}
           >
            {placeholder&&<option value='' disabled>{placeholder}</option>}
            {values.map((value,index)=>(
              <option key={index} value={index}>{value.name}</option>
            ))}
					</select>
          </div>
    </div>
  )
}

const selectStyle = css`
	margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${mq('lg')}{
    margin: 0;
    flex-flow: column nowrap;
    width: ${size.p(800,276)};
    align-items: flex-start;
  }
  `

const titleStyle = css`
  font-family: var(--font-en);
  font-weight: 500;
  font-size: ${size.rem(14)};
  letter-spacing: 0.06em;
  ${mq('lg')}{
    font-size:${size.rem(17)}
  }
`

const selectWrapStyle = css`
    position: relative;
    width:${size.p(300,230)};
    min-width: max-content;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    ${mq('lg')}{
      width:${size.p(276,244)}
    }
&::before{
    position: absolute;
    right: ${size.rem(16)};
    top: auto;
    border-right: 1px solid var(--color-white);
    border-bottom: 1px solid var(--color-white);
    transform: rotate(45deg);
    content: '';
    width: ${size.rem(7)};
    height: ${size.rem(7)};
    display: block;
    margin-top: -.25em;
    pointer-events: none;
    ${mq('lg')}{
      margin-top: .25em;
    }
  }
`

const selectBoxStyle = css`
  	border: 1px solid var(--primary-border);
    width: 100%;
    border-radius: 30px;
    padding: ${size.rem(6)} 1.6em ${size.rem(6)} 1em;
    font-size: ${size.rem(14)};
    letter-spacing: ${size.ls(60)};
    font-weight: 400;
    color: var(--color-white);
    background: transparent;
    ${mq('lg')}{
      font-size: ${size.rem(16)};
      margin-top: ${size.rem(8.8)};
    }
`