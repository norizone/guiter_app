import { motion } from "framer-motion"
import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline"
import { InputBpmArea } from "@/components/pages/rhythm/InputBpmArea"
import { RhythmArea } from "@/components/pages/rhythm/RhythmArea"
import { SelectRhythmTypeArea } from "@/components/pages/rhythm/SelectRhythmTypeArea"
import { PrimaryInputsWrap } from "@/components/wraps/PrimaryInputsWrap"

export const Rhythm = () => {
  return (
    <main
    // initial={{opacity:0,y:0 ,zIndex:0}}
    // animate={{opacity:1,y:0 ,zIndex:1}}
    // exit={{opacity:0,y:0,zIndex:0}}
    // transition={{duration:.4}}
    // style={{position:"absolute",top:0,left:0,width:'100%',height:'100%',overflow:'auto'}}
    >
      <PrimaryHeadline>Rhythm</PrimaryHeadline>
      <PrimaryInputsWrap>
        <SelectRhythmTypeArea/>
        <InputBpmArea/>
      </PrimaryInputsWrap>
    </main>
  )
}
