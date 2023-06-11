import { Outlet } from "react-router-dom";

import { PrimaryNavi } from "@/components/navis/PrimaryNavi";
import { css } from "@emotion/react";

export const PrimaryLayout = () => {
  return (
    <div>
      <PrimaryNavi />
      <Outlet />
    </div>
  )
}