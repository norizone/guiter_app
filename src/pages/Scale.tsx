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
    transition={{duration:.4}}
    style={{position:"fixed" , top:0 ,left:0,width:'100%'}}
    >
      <PrimaryHeadline>Scale</PrimaryHeadline>
      <InputArea/>
      <FretBoardContents/>
    </motion.main>
  )
}

