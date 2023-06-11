import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline"
import { FretBoardContents } from "@/components/pages/scale/FretBoardContents"
import { InputArea } from "@/components/pages/scale/InputArea"
import { motion } from "framer-motion"

export const Scale = () => {
  return (
    <motion.main
    initial={{opacity:0,y:0 ,zIndex:0}}
    animate={{opacity:1,y:0 ,zIndex:1}}
    exit={{opacity:0,y:0 ,zIndex:0}}
    transition={{duration:.2}}
    style={{position:"relative"}}
  >
      <PrimaryHeadline>Scale</PrimaryHeadline>
      <InputArea/>
      <FretBoardContents/>
    </motion.main>
  )
}

