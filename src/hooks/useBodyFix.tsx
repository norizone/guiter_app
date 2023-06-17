import  { useState } from 'react';

export const useBodyFix = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const body = document.body;
  let scrollAmount = 0

  const onFixOn = () => {
    scrollAmount = window.scrollY;
    setScrollPosition(scrollAmount);
    body.style.position = 'fixed';
    body.style.top = `-${scrollAmount}px`;
  }

  const onFixOff = () => {
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    window.scrollTo({ top: scrollPosition });
  }

  return { onFixOn, onFixOff }
};