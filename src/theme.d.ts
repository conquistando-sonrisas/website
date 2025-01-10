import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    conquiDarkBlue: Palette['primary'];
    conquiLightBlue: Palette['primary'];
    conquiYellow: Palette['primary'];
  }

  interface PaletteOptions {
    conquiDarkBlue?: Palette['primary'];
    conquiLightBlue?: PaletteOptions['primary'];
    conquiYellow?: Palette['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    conquiDarkBlue: true;
    conquiLightBlue: true;
    conquiYellow: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    conquiDarkBlue: true;
    conquiLightBlue: true;
    conquiYellow: true;
  }
}
