'use client';
import { createTheme, getContrastRatio } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#24376f',
      light: '#19264d',
      dark: '#4f5f8b',
      contrastText: '#fff'
    },
    conquiLightBlue: {
      main: '#88C0E4',
      light: '#9fcce9',
      dark: '#5f869f',
      "100": '#eef6fb',
      "50": '#fbfdfe',
      contrastText: getContrastRatio('#88C0E4', '#000') > 4.5 ? '#000' : 'fff'
    },
    conquiDarkBlue: {
      main: '#24376f',
      light: '#19264d',
      dark: '#4f5f8b',
      contrastText: '#fff'
    },
    conquiYellow: {
      main: '#f2c736',
      light: '#ecca5e',
      dark: '#a28425',
      contrastText: getContrastRatio('#e8bd36', '#000') > 4.5 ? '#000' : 'fff'
    },
    customGray: {
      main: '#71788e',
      light: '#8e93a4',
      dark: '#5b6071',
      contrastText: '#0b2332'
    },
  },
  typography: {
    fontFamily: ['Lexend', 'sans-serif'].join(','),
    allVariants: {
      color: '#151633'
    },
  }
})

export default theme;