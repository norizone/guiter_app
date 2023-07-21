import { useState } from "react";

export const useBodyFix = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(-1);
  const body = document.body;
  let scrollAmount = 0;

  const onFixOn = () => {
    scrollAmount = window.scrollY;
    setScrollPosition(scrollAmount);
    body.style.position = "fixed";
    body.style.top = `-${scrollAmount}px`;
    body.style.overflow= "hidden";
    body.style.width="100%";
  };

  const onFixOff = () => {
    body.removeAttribute("style");
    window.scrollTo({ top: scrollPosition });
  };

  return { onFixOn, onFixOff };
};
