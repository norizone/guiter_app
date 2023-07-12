import { PrimaryHeadline } from "@/components/headlines/PrimaryHeadline";
import { InputArea } from "@/features/code/components/InputArea";
import { CodeFretBoardContents } from "@/features/code/components/CodeFretBoardContents";
import { motion } from "framer-motion";

export const Code = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 0, zIndex: 1 }}
      animate={{ opacity: 1, y: 0, zIndex: 1 }}
      exit={{ opacity: 0, y: 0, zIndex: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: "relative" }}
    >
      <PrimaryHeadline>Code</PrimaryHeadline>
      <InputArea />
      <CodeFretBoardContents />
    </motion.main>
  );
};
