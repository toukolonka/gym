import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
      light: '#008394',
      dark: '#33c9dc',
      contrastText: '#000',
    },
    secondary: {
      main: '#e040fb',
      light: '#9c2caf',
      dark: '#e666fb',
      contrastText: '#000',
    },
    background: {
      paper: '#3b3b3b',
      default: '#303030',
    },
    text: {
      primary: '#fff',
      info: '#03a9f4',
    },
  },
});

export default theme;
