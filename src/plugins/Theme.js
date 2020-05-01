import { createMuiTheme } from '@material-ui/core/styles'
import { dark } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#50CAF9',
    },
  },
});

export default theme;