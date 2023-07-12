import { Routes, Route, useLocation } from "react-router-dom";
import { PrimaryLayout } from "@/templates/PrimaryLayout";
import { Rhythm } from "../pages/Rhythm";
import { Code } from "../pages/Code";
import { Scale } from "../pages/Scale";
import { Tuning } from "../pages/Tuning";
import { AnimatePresence, motion } from "framer-motion";
import { useRhythmPlayer } from "@/hooks/useRhythmPlayer";

export const Router = () => {
  const location = useLocation();
  const { MinRhythmPlayer, PrimaryRhythmPlayer } = useRhythmPlayer();
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Rhythm />} />
            <Route path="rhythm" element={<Rhythm />} />
            <Route path="code" element={<Code />} />
            <Route path="scale" element={<Scale />} />
            <Route path="tuning" element={<Tuning />} />
            <Route path="*" element={<Rhythm />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {location.pathname === "/rhythm" || location.pathname === "/" ? (
          <motion.div
            key="PrimaryRhythmPlayer"
            initial={{ opacity: 0, y: 100, zIndex: 0 }}
            animate={{ opacity: 1, y: 0, zIndex: 1 }}
            exit={{ opacity: 0, y: 100, zIndex: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "relative" }}
          >
            <PrimaryRhythmPlayer />
          </motion.div>
        ) : (
          location.pathname !== "/tuning" && (
            <motion.div
              key="MinRhythmPlayer"
              initial={{ opacity: 0, y: 0, zIndex: 0 }}
              animate={{ opacity: 1, y: 0, zIndex: 1 }}
              exit={{ opacity: 0, y: 0, zIndex: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: "relative" }}
            >
              <MinRhythmPlayer />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
};
