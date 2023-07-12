import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline";
import { motion } from "framer-motion";

import { AudioSketch } from "@/features/tuning/components/AudioSketch";

export const Tuning = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 0, zIndex: 0 }}
      animate={{ opacity: 1, y: 0, zIndex: 1 }}
      exit={{ opacity: 0, y: 0, zIndex: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: "relative" }}
    >
      <PrimaryHeadline>Tuning</PrimaryHeadline>
      <AudioSketch />
    </motion.main>
  );
};
