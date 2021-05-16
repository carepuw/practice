import React from 'react'
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { store, ACTION_LOGIN, SET_SOCKET } from './redux'
import { io } from "socket.io-client";

import { ThemeProvider } from '@material-ui/core/styles';

import App from './App'
import { theme } from './theme'

import './styles/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4052/graphql',
  cache: new InMemoryCache()
});

const user = JSON.parse(localStorage.getItem('1312'))
if (user) {
  const newUser = { ...user };
  newUser.online = true;
  store.dispatch(ACTION_LOGIN(newUser));
  const socket = io('http://localhost:4052');
  socket.emit('ONLINE', newUser.id);
  store.dispatch(SET_SOCKET(socket));
}

render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
