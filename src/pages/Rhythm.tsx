import { motion } from "framer-motion"
import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline"
import { InputBpmArea } from "@/components/pages/rhythm/InputBpmArea"
import { SelectRhythmTypeArea } from "@/components/pages/rhythm/SelectRhythmTypeArea"
import { PrimaryInputsWrap } from "@/components/wraps/PrimaryInputsWrap"
import { SelectBeat } from "@/components/pages/rhythm/SelectBeat"

export const Rhythm = () => {
  return (
    <motion.main
    initial={{opacity:0,y:0 ,zIndex:0}}
    animate={{opacity:1,y:0 ,zIndex:1}}
    exit={{opacity:0,y:0,zIndex:0}}
    transition={{duration:.2}}
    style={{position:"relative"}}
>
      <PrimaryHeadline>Rhythm</PrimaryHeadline>
      <PrimaryInputsWrap>
        <SelectRhythmTypeArea/>
        <InputBpmArea/>
        <SelectBeat/>
      </PrimaryInputsWrap>
    </motion.main>
  )
}
