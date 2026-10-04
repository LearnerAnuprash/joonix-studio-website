export const palette = {
  black: "#000000",
  ink: "#1F150C",
  earth: "#412D15",
  cream: "#E1DCC9",
} as const;

export const themeColor = {
  dark: palette.ink,
  light: palette.cream,
} as const;

export type Theme = keyof typeof themeColor;
