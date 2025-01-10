'use client';
import { createTheme, getContrastRatio } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    conquiLightBlue: {
      main: '#88C0E4',
      light: '#9fcce9',
      dark: '#5f869f',
      contrastText: getContrastRatio('#88C0E4', '#000') > 4.5 ? '#000' : 'fff'
    },
    conquiDarkBlue: {
      main: '#24376f',
      light: '#19264d',
      dark: '#4f5f8b',
      contrastText: '#fff'
    },
    conquiYellow: {
      main: '#e8bd36',
      light: '#ecca5e',
      dark: '#a28425',
      contrastText: getContrastRatio('#e8bd36', '#000') > 4.5 ? '#000' : 'fff'
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    allVariants: {
      color: '#151633'
    }, 
  }
})

export default theme;