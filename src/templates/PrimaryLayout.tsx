import { Outlet } from "react-router-dom";

import { PrimaryNavi } from "@/components/navis/PrimaryNavi";
import { Suspense } from "react";

export const PrimaryLayout = () => {
  return (
    <div>
      <PrimaryNavi />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
