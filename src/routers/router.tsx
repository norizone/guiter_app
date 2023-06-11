import { Routes, Route, useLocation } from "react-router-dom";
import { PrimaryLayout } from "@/templates/PrimaryLayout";
import { Rhythm } from "../pages/Rhythm";
import { Code } from "../pages/Code";
import { Scale } from "../pages/Scale";
import { Tuning } from "../pages/Tuning";
import { AnimatePresence } from "framer-motion";
import { useRhythmPlayer } from "@/hooks/useRhythmPlayer";

import { PlayingNavi } from "@/components/navis/PlayIngNavi";
import { RhythmArea } from "@/components/pages/rhythm/RhythmArea";
import { css } from "@emotion/react";


export const Router = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={ <PrimaryLayout/>} >
          <Route index element={<Rhythm />} />
          <Route path="rhythm" element={<Rhythm />} />
          <Route path="code" element={<Code/>} />
          <Route path="scale" element={<Scale />} />
          <Route path="tuning" element={<Tuning />} />
          <Route path="*" element={<Rhythm />} />
        </Route>
      </Routes>
      </AnimatePresence>
  );
};

