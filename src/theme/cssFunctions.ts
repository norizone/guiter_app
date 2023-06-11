export const size = {
  rem: (value: number) => `${value / 16}rem`,
  vw: (contentWidth: number, parentWidth: number) =>
    `${(parentWidth / contentWidth) * 100}vw`,
  vh: (contentHeight: number, parentHeight: number) =>
    `${(parentHeight / contentHeight) * 100}vh`,
  p: (contentValue: number, parentValue: number) =>
    `${(parentValue / contentValue) * 100}%`,
  lh: (fontSize: number, lineHeight: number) => lineHeight / fontSize,
  ls: (letterSpacing: number) => `${letterSpacing / 1000}em`,
};

type Breakpoints = 's' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const breakpoints: Record<Breakpoints, number> = {
  's': 480,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
  'xxl': 1400,
};

export const mq = (size:Breakpoints) => {
  return `@media (min-width: ${breakpoints[size]}px)`;
};
