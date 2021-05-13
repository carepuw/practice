import React from 'react'
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App'
import { theme } from './theme'

import '../styles/index.scss';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
