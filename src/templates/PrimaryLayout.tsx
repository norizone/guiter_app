import { Outlet, useLocation } from "react-router-dom";

import { PrimaryNavi } from "@/components/navis/PrimaryNavi";

import { useRhythmPlayer } from "@/hooks/useRhythmPlayer";

export const PrimaryLayout = () => {
  const {MinRhythmPlayer,PrimaryRhythmPlayer} = useRhythmPlayer()

  const location = useLocation();
  return (
    <div>
      <PrimaryNavi />
      <Outlet />

      <PrimaryRhythmPlayer/>
      <MinRhythmPlayer />
    </div>
  )
}