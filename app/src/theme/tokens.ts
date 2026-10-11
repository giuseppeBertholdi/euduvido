/**
 * Tokens da direção "Gambá" — versão clara.
 * Papel creme, tinta grafite, amarelo de lanterna e rosa só nos detalhes. Profundidade vem de uma "sombra de
 * adesivo" (placa grafite deslocada) em vez de sombra difusa: tátil, mas com a cara da marca.
 * Contraste (WCAG AA): ink 12:1, inkSoft 7:1, inkMuted 4,9:1 sobre `paper`; pinkInk 4,6:1 sobre `paper`.
 */
export const colors = {
  paper: '#FBF5EA',
  surface: '#FFFDF8',
  sunk: '#F1E8D8',
  line: '#E3D8C6',
  ink: '#2B2B2B',
  inkSoft: '#4E4943',
  inkMuted: '#6B645C',
  yellow: '#FFD600',
  yellowSoft: '#FFF1A6',
  yellowHi: '#FFE45C',
  yellowLo: '#F2C900',
  pink: '#F4A7A7',
  pinkSoft: '#FCE3E1',
  pinkInk: '#A9433F',
  green: '#2F8F5B',
  greenSoft: '#D9F2E1',
  scrim: 'rgba(43,43,43,0.45)',
  // legados usados em poucos pontos escuros (teclado do PIN etc.)
  graphite: '#2B2B2B',
  cream: '#F4E9DD',
} as const;

export const fonts = {
  display: 'Syne_800ExtraBold',
  ui500: 'RethinkSans_500Medium',
  ui600: 'RethinkSans_600SemiBold',
  ui700: 'RethinkSans_700Bold',
  ui800: 'RethinkSans_800ExtraBold',
} as const;

export const radii = { button: 20, hold: 22, card: 24, sheet: 32, key: 16, magnitude: 12, pill: 999, badge: 14, tile: 22 } as const;

/** Quanto a placa de profundidade aparece por baixo (e quanto o botão afunda ao apertar). */
export const depth = { lift: 4, press: 3 } as const;

export const space = { gutter: 20, gap: 12, keyGap: 8, chipGap: 6 } as const;

/** Teto de escala de fonte do sistema pros textos de display (o corpo escala livre). */
export const maxScale = { display: 1.15, ui: 1.4 } as const;
