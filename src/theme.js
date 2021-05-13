import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2c387e',
      main: '#3f51b5',
      dark: '#6573c3',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  }
})
