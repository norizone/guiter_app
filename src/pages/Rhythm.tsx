import { motion } from "framer-motion";
import { useEffect } from "react";

import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline";
import { InputBpmArea } from "@/features/rhythm/components/InputBpmArea";
import { SelectRhythmTypeArea } from "@/features/rhythm/components/SelectRhythmTypeArea";
import { PrimaryInputsWrap } from "@/components/wraps/PrimaryInputsWrap";
import { SelectBeat } from "@/features/rhythm/components/SelectBeat";
import { useModal } from "@/hooks/useModal";

export const Rhythm = () => {
  const {closeModal} = useModal()
  useEffect(()=>{
    return () => closeModal();
  },[])
  return (
    <motion.main
      initial={{ opacity: 0, y: 0, zIndex: 0 }}
      animate={{ opacity: 1, y: 0, zIndex: 1 }}
      exit={{ opacity: 0, y: 0, zIndex: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: "relative" }}
    >
      <PrimaryHeadline>Rhythm</PrimaryHeadline>
      <PrimaryInputsWrap>
        <SelectRhythmTypeArea />
        <InputBpmArea />
        <SelectBeat />
      </PrimaryInputsWrap>
    </motion.main>
  );
};
