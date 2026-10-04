export const palette = {
  black: "#000000",
  white: "#FFFFFF",
  ink: "#1F150C",
  earth: "#412D15",
  cream: "#E1DCC9",
} as const;

export const themeColor = {
  dark: palette.ink,
  light: palette.white,
} as const;

export type Theme = keyof typeof themeColor;
