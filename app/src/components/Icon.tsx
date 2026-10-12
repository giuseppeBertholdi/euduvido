import type { ReactElement } from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors } from '@/theme';

/**
 * Ícones do Eu Duvido!: desenhados à mão num grid de 24, traço 2,2 arredondado + uma mancha de cor por baixo
 * (duotone). A mancha é o que dá a cara de "adesivo" da marca; passe `accent="none"` pra versão só traço.
 */
type Draw = (ink: string, accent: string) => ReactElement;

const ICONS = {
  arrowRight: (k) => <Path d="M5 12h13M13 6l6 6-6 6" stroke={k} />,
  arrowLeft: (k) => <Path d="M19 12H6M11 6l-6 6 6 6" stroke={k} />,
  close: (k) => <Path d="M6 6l12 12M18 6L6 18" stroke={k} />,
  check: (k) => <Path d="M5 12.5l4.5 4.5L19 7" stroke={k} />,
  passPhones: (k, a) => (
    <>
      <Rect x={2.5} y={6} width={9} height={15} rx={2.5} fill={a} stroke={k} />
      <Rect x={12.5} y={3} width={9} height={15} rx={2.5} fill={colors.surface} stroke={k} />
      <Path d="M5.5 3.5c1.2-1 2.6-1.4 4.2-1.2M8.4 1l1.4 1.3-1.3 1.4" stroke={k} />
      <Path d="M15.5 15h3" stroke={k} />
    </>
  ),
  pin: (k, a) => (
    <>
      <Rect x={2.5} y={6} width={19} height={12} rx={3.5} fill={a} stroke={k} />
      {[7, 10.4, 13.8, 17.2].map((x) => (
        <Circle key={x} cx={x} cy={12} r={1.15} fill={k} />
      ))}
    </>
  ),
  room: (k, a) => (
    <>
      <Path d="M4 20.5V10l8-6.2 8 6.2v10.5z" fill={a} stroke={k} />
      <Path d="M12 11v6.5M8.75 14.25h6.5" stroke={k} />
    </>
  ),
  help: (k, a) => (
    <>
      <Path d="M4.5 4.5h15a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5H11l-5 3.5V17H4.5A1.5 1.5 0 0 1 3 15.5V6a1.5 1.5 0 0 1 1.5-1.5z" fill={a} stroke={k} />
      <Path d="M10 8.6a2.1 2.1 0 1 1 3.1 1.8c-.7.4-1.1.9-1.1 1.6" stroke={k} />
      <Circle cx={12} cy={14.2} r={0.9} fill={k} />
    </>
  ),
  crown: (k, a) => (
    <>
      <Path d="M3 8l4.6 4L12 4.5l4.4 7.5L21 8l-2 11H5z" fill={a} stroke={k} />
      <Path d="M7.5 15.5h9" stroke={k} />
    </>
  ),
  lock: (k, a) => (
    <>
      <Rect x={4.5} y={10} width={15} height={11} rx={3} fill={a} stroke={k} />
      <Path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14.5v2" stroke={k} />
    </>
  ),
  timer: (k, a) => (
    <>
      <Circle cx={12} cy={13.5} r={7.5} fill={a} stroke={k} />
      <Path d="M12 13.5V9.5M9.5 2.5h5M18.5 6.5l1.3-1.3" stroke={k} />
    </>
  ),
  share: (k) => <Path d="M12 3.5v11M7.5 8l4.5-4.5L16.5 8M5 13v5.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V13" stroke={k} />,
  users: (k, a) => (
    <>
      <Circle cx={9} cy={8} r={3.5} fill={a} stroke={k} />
      <Path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" stroke={k} />
      <Circle cx={17.2} cy={9} r={2.6} stroke={k} />
      <Path d="M16.5 14.4a5 5 0 0 1 5 5.6" stroke={k} />
    </>
  ),
  sparkle: (k, a) => <Path d="M12 2.8l2.1 6.1 6.1 2.1-6.1 2.1L12 19.2l-2.1-6.1L3.8 11l6.1-2.1z" fill={a} stroke={k} />,
  eye: (k, a) => (
    <>
      <Path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke={k} />
      <Circle cx={12} cy={12} r={3.2} fill={a} stroke={k} />
    </>
  ),
  trophy: (k, a) => (
    <>
      <Path d="M7 3.5h10V9a5 5 0 0 1-10 0z" fill={a} stroke={k} />
      <Path d="M7 5.5H4.2v1.2A3.3 3.3 0 0 0 7.5 10M17 5.5h2.8v1.2a3.3 3.3 0 0 1-3.3 3.3M12 14v3.5M8 20.5h8M9.5 17.5h5" stroke={k} />
    </>
  ),
  refresh: (k) => <Path d="M20 12a8 8 0 1 1-2.4-5.7M20 3.8v5h-5" stroke={k} />,
  megaphone: (k, a) => (
    <>
      <Path d="M3.5 9.5v5h3l7.5 5V4.5l-7.5 5z" fill={a} stroke={k} />
      <Path d="M17.5 9a4 4 0 0 1 0 6M20 6.5a7.5 7.5 0 0 1 0 11" stroke={k} />
    </>
  ),
  backspace: (k, a) => (
    <>
      <Path d="M9 5h11a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 20 19H9l-6.5-7z" fill={a} stroke={k} />
      <Path d="M12 9l5 6M17 9l-5 6" stroke={k} />
    </>
  ),
  lip: (k, a) => (
    <>
      <Path d="M3 12c2.5-4 5-5 6.5-4.2.9.5 1.7.6 2.5 0s1.6-.5 2.5 0C16 7 18.5 8 21 12c-3 4.5-6 6-9 6s-6-1.5-9-6z" fill={a} stroke={k} />
      <Path d="M3 12h18" stroke={k} />
    </>
  ),
  gear: (k, a) => (
    <>
      <Path d="M12 2.8l1.6 2.3 2.7-.6.9 2.6 2.6.9-.6 2.7 2.3 1.6-2.3 1.6.6 2.7-2.6.9-.9 2.6-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.9-2.6-2.6-.9.6-2.7L2.5 12l2.3-1.6-.6-2.7 2.6-.9.9-2.6 2.7.6z" fill={a} stroke={k} />
      <Circle cx={12} cy={12} r={3.2} fill={colors.surface} stroke={k} />
    </>
  ),
  // pacotes
  bulb: (k, a) => (
    <>
      <Path d="M12 2.8a6.2 6.2 0 0 0-3.7 11.2c.6.5 1 1.2 1 2V16.5h5.4v-.5c0-.8.4-1.5 1-2A6.2 6.2 0 0 0 12 2.8z" fill={a} stroke={k} />
      <Path d="M9.5 19.5h5M10.5 22h3" stroke={k} />
    </>
  ),
  brasil: (k, a) => (
    <>
      <Path d="M12 3.5l9.5 8.5-9.5 8.5L2.5 12z" fill={a} stroke={k} />
      <Circle cx={12} cy={12} r={3.6} fill={colors.surface} stroke={k} />
      <Path d="M8.6 11.2c2.2-.6 4.6-.3 6.8.9" stroke={k} />
    </>
  ),
  paw: (k, a) => (
    <>
      <Path d="M12 11.5c-3 0-6 3.8-6 6.3 0 1.9 1.5 2.7 3 2.7 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.5 0 3-.8 3-2.7 0-2.5-3-6.3-6-6.3z" fill={a} stroke={k} />
      <Ellipse cx={5} cy={10} rx={1.8} ry={2.3} stroke={k} />
      <Ellipse cx={9} cy={5.5} rx={1.8} ry={2.4} stroke={k} />
      <Ellipse cx={15} cy={5.5} rx={1.8} ry={2.4} stroke={k} />
      <Ellipse cx={19} cy={10} rx={1.8} ry={2.3} stroke={k} />
    </>
  ),
  heart: (k, a) => (
    <>
      <Path d="M12 20.5s-8.5-4.8-8.5-11A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 2.9c0 6.2-8.5 11-8.5 11z" fill={a} stroke={k} />
      <Path d="M6.5 12h3l1.4-2.4 2.2 4.8 1.4-2.4h3" stroke={k} />
    </>
  ),
  cursor: (k, a) => (
    <>
      <Path d="M5 3.5l13.5 6.8-5.8 1.6L10.8 18z" fill={a} stroke={k} />
      <Path d="M13 12.2l5 6.3" stroke={k} />
    </>
  ),
  cup: (k, a) => (
    <>
      <Path d="M4 8.5h13v5.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 4 14z" fill={a} stroke={k} />
      <Path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.8c-.8 1 .8 1.8 0 3M12 2.8c-.8 1 .8 1.8 0 3M3 21.5h16" stroke={k} />
    </>
  ),
  bolt: (k, a) => <Path d="M13.5 2.5L4.5 13.5h6.5l-1 8 9-11h-6.5z" fill={a} stroke={k} />,
  planet: (k, a) => (
    <>
      <Circle cx={12} cy={12} r={6} fill={a} stroke={k} />
      <Path d="M6.3 14.2C3 16.5 1.8 18.4 2.5 19.3c1.2 1.5 6.8-.7 12.4-5s9.3-9.1 8.1-10.6c-.7-.9-2.9-.4-5.7 1" stroke={k} />
    </>
  ),
  ball: (k, a) => (
    <>
      <Circle cx={12} cy={12} r={9} fill={a} stroke={k} />
      <Path d="M12 7.5l3.3 2.4-1.3 3.9h-4l-1.3-3.9zM12 7.5V3M15.3 9.9l4.3-1.5M14 13.8l2.6 3.7M10 13.8l-2.6 3.7M8.7 9.9L4.4 8.4" stroke={k} />
    </>
  ),
  cassette: (k, a) => (
    <>
      <Rect x={2.5} y={5} width={19} height={14} rx={2.5} fill={a} stroke={k} />
      <Circle cx={8.5} cy={11} r={1.8} stroke={k} />
      <Circle cx={15.5} cy={11} r={1.8} stroke={k} />
      <Path d="M10.3 11h3.4M6.5 19l1.5-3h8l1.5 3" stroke={k} />
    </>
  ),
  meme: (k, a) => (
    <>
      <Circle cx={12} cy={12} r={9} fill={a} stroke={k} />
      <Path d="M8 9.5l1.6 1M16 9.5l-1.6 1M7.5 14c1.2 2.2 2.8 3.2 4.5 3.2s3.3-1 4.5-3.2z" stroke={k} />
      <Path d="M12 17.2v-1.6" stroke={k} />
    </>
  ),
  pepper: (k, a) => (
    <>
      <Path d="M8 8.5c-2.8 1.2-4.6 4.4-4.4 8 .1 2 1.6 3.4 3.4 2.8 4.8-1.5 9.6-5.4 11-9.7.6-1.9-.6-3.4-2.5-3.3-2.6.2-5 1-7.5 2.2z" fill={a} stroke={k} />
      <Path d="M16 6.3c.2-1.6 1.2-2.8 2.8-3.3M14.5 6.2c1.2-.8 2.6-.8 3.6.2" stroke={k} />
    </>
  ),
  tv: (k, a) => (
    <>
      <Rect x={2.5} y={6.5} width={19} height={13} rx={2.5} fill={a} stroke={k} />
      <Path d="M8 2.8l4 3.7 4-3.7M8.5 22h7" stroke={k} />
      <Path d="M6.5 10.5c3.5-.7 7.5-.7 11 0M6.5 15.5c3.5.7 7.5.7 11 0" stroke={k} />
    </>
  ),
  note: (k, a) => (
    <>
      <Ellipse cx={7} cy={18} rx={3.2} ry={2.6} fill={a} stroke={k} />
      <Ellipse cx={17} cy={16} rx={3.2} ry={2.6} fill={a} stroke={k} />
      <Path d="M10.2 18V5.5l10-2.5V16M10.2 9l10-2.5" stroke={k} />
    </>
  ),
  money: (k, a) => (
    <>
      <Circle cx={12} cy={12} r={9} fill={a} stroke={k} />
      <Path d="M15 8.8c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.3 0 3.2 6 1.7 6 4.8 0 1.4-1.3 2.3-3 2.3-1.4 0-2.5-.6-3.1-1.6M12 5.5v1.8M12 16.7v1.8" stroke={k} />
    </>
  ),
  globe: (k, a) => (
    <>
      <Circle cx={12} cy={12} r={9} fill={a} stroke={k} />
      <Path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z" stroke={k} />
    </>
  ),
} satisfies Record<string, Draw>;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 24, color = colors.ink, accent = colors.yellow, strokeWidth = 2.2 }: { name: IconName; size?: number; color?: string; accent?: string; strokeWidth?: number }) {
  const draw: Draw = ICONS[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {draw(color, accent === 'none' ? 'none' : accent)}
    </Svg>
  );
}
